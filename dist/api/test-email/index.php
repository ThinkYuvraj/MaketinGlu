<?php
// ==============================================================================
// MarketinGlu - Instant Diagnostic Mail Endpoint for Hostinger
// Directly tests and confirms SMTP delivery to marketing2glue@gmail.com
// ==============================================================================
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

function getEnvValue($key, $default = '') {
    $val = getenv($key);
    if (!empty($val)) return trim($val);
    if (!empty($_ENV[$key])) return trim($_ENV[$key]);
    if (!empty($_SERVER[$key])) return trim($_SERVER[$key]);
    
    $candidates = [
        __DIR__ . '/../../.env',
        __DIR__ . '/../../../.env',
        dirname(__DIR__, 2) . '/.env',
        dirname(__DIR__, 3) . '/.env',
        $_SERVER['DOCUMENT_ROOT'] . '/.env',
        $_SERVER['DOCUMENT_ROOT'] . '/../.env',
    ];

    foreach ($candidates as $cand) {
        if (file_exists($cand) && is_readable($cand)) {
            $lines = file($cand, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            foreach ($lines as $line) {
                $line = trim($line);
                if (empty($line) || $line[0] === '#') continue;
                if (strpos($line, '=') !== false) {
                    list($k, $v) = explode('=', $line, 2);
                    if (trim($k) === $key) {
                        return trim($v, " \t\n\r\0\x0B\"'");
                    }
                }
            }
        }
    }
    return $default;
}

$smtpUser = getEnvValue('SMTP_USER', 'marketing2glue@gmail.com');
$smtpPass = getEnvValue('SMTP_PASS', 'hcpv lsyw qyph yrei');
$cleanPass = preg_replace('/\s+/', '', trim($smtpPass, "\"'"));
$receiverEmail = getEnvValue('INQUIRY_EMAIL', 'marketing2glue@gmail.com');
$target = !empty($_GET['email']) ? trim($_GET['email']) : $receiverEmail;

function sendDirectSmtp($host, $port, $user, $pass, $to, $subject, $html) {
    $timeout = 12;
    $context = stream_context_create([
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        ]
    ]);

    $prefix = ($port == 465) ? 'ssl://' : '';
    $socket = @stream_socket_client($prefix . $host . ':' . $port, $errno, $errstr, $timeout, STREAM_CLIENT_CONNECT, $context);
    if (!$socket) {
        throw new Exception("Socket connect failed: $errstr ($errno)");
    }

    $readResponse = function() use ($socket) {
        $data = '';
        while ($line = fgets($socket, 512)) {
            $data .= $line;
            if (isset($line[3]) && $line[3] === ' ') break;
        }
        return $data;
    };

    $sendCommand = function($cmd, $expectedCode = 250) use ($socket, $readResponse) {
        fputs($socket, $cmd . "\r\n");
        $res = $readResponse();
        $code = (int)substr($res, 0, 3);
        if ($expectedCode && $code !== $expectedCode) {
            throw new Exception("SMTP error on [$cmd]: $res");
        }
        return $res;
    };

    $readResponse();
    $sendCommand("EHLO " . gethostname());

    if ($port != 465) {
        $sendCommand("STARTTLS", 220);
        stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT);
        $sendCommand("EHLO " . gethostname());
    }

    $sendCommand("AUTH LOGIN", 334);
    $sendCommand(base64_encode($user), 334);
    $sendCommand(base64_encode($pass), 235);

    $sendCommand("MAIL FROM:<$user>");
    $sendCommand("RCPT TO:<$to>");
    $sendCommand("DATA", 354);

    $headers = [
        "MIME-Version: 1.0",
        "Content-Type: text/html; charset=UTF-8",
        "From: =?UTF-8?B?" . base64_encode("MarketinGlu System") . "?= <$user>",
        "To: <$to>",
        "Subject: =?UTF-8?B?" . base64_encode($subject) . "?=",
        "Date: " . date('r'),
    ];

    $mime = implode("\r\n", $headers) . "\r\n\r\n" . $html . "\r\n.\r\n";
    fputs($socket, $mime);
    $readResponse();

    $sendCommand("QUIT", 221);
    fclose($socket);
    return true;
}

$subject = "✅ MarketinGlu Live Hostinger Diagnostic Confirmation";
$body = '
<div style="font-family: Arial, sans-serif; max-width: 500px; margin: 20px auto; padding: 24px; background: #0c1424; color: #fff; border-radius: 12px; border: 1px solid #38bdf8;">
  <h2 style="color: #38bdf8; margin-top: 0;">MarketinGlu SMTP is 100% Operational!</h2>
  <p>This email confirms that your Hostinger live deployment is connected to Google SMTP and actively delivering customer leads.</p>
  <ul>
    <li><strong>Dispatched from:</strong> ' . htmlspecialchars($smtpUser) . '</li>
    <li><strong>Target recipient:</strong> ' . htmlspecialchars($target) . '</li>
    <li><strong>Timestamp:</strong> ' . date('r') . '</li>
  </ul>
</div>';

try {
    try {
        sendDirectSmtp('smtp.gmail.com', 465, $smtpUser, $cleanPass, $target, $subject, $body);
        $method = 'SSL Port 465';
    } catch (Exception $e1) {
        sendDirectSmtp('smtp.gmail.com', 587, $smtpUser, $cleanPass, $target, $subject, $body);
        $method = 'STARTTLS Port 587';
    }

    echo json_encode([
        'diagnostic' => true,
        'result' => ['success' => true, 'method' => $method],
        'sentTo' => $target,
        'smtpUser' => $smtpUser,
        'smtpHost' => 'smtp.gmail.com',
        'timestamp' => date('c'),
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'diagnostic' => true,
        'result' => ['success' => false, 'error' => $e->getMessage()],
        'sentTo' => $target,
        'smtpUser' => $smtpUser,
        'timestamp' => date('c'),
    ]);
}
