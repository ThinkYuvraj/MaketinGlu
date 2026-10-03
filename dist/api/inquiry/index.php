<?php
// ==============================================================================
// MarketinGlu - High-Reliability Native Hostinger Inquiry Processor
// Supports both direct LiteSpeed/Apache execution and standalone dispatch
// ==============================================================================
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// 1. Dynamic Credential Discovery
function getEnvValue($key, $default = '') {
    $val = getenv($key);
    if (!empty($val)) return trim($val);
    if (!empty($_ENV[$key])) return trim($_ENV[$key]);
    if (!empty($_SERVER[$key])) return trim($_SERVER[$key]);
    
    // Check multiple candidate locations for .env on Hostinger
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
// Clean spaces and quotes from app password
$cleanPass = preg_replace('/\s+/', '', trim($smtpPass, "\"'"));
$receiverEmail = getEnvValue('INQUIRY_EMAIL', 'marketing2glue@gmail.com');

// 2. Read incoming client lead
$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);
if (!is_array($data) || empty($data)) {
    $data = $_POST;
}

$name = trim($data['name'] ?? ($_GET['name'] ?? 'Website Consultation Lead'));
$email = trim($data['email'] ?? ($_GET['email'] ?? ''));
$phone = trim($data['phone'] ?? ($_GET['phone'] ?? ''));
$service = trim($data['service'] ?? ($_GET['service'] ?? 'Full Digital Suite'));
$notes = trim($data['notes'] ?? ($data['message'] ?? ($_GET['notes'] ?? '')));

if (empty($name) && empty($email) && empty($phone)) {
    echo json_encode([
        'status' => 'ok',
        'service' => 'MarketinGlu Native API Engine',
        'receiver' => $receiverEmail,
        'time' => date('c'),
    ]);
    exit;
}

// 3. Socket-based Direct SMTP Dispatcher (SSL 465 / STARTTLS 587)
function dispatchSmtp($host, $port, $user, $pass, $to, $fromName, $replyTo, $subject, $html) {
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
        throw new Exception("Socket connect failed to $host:$port - $errstr ($errno)");
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

    $readResponse(); // server banner
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
        "From: =?UTF-8?B?" . base64_encode($fromName) . "?= <$user>",
        "To: <$to>",
        "Subject: =?UTF-8?B?" . base64_encode($subject) . "?=",
        "Date: " . date('r'),
    ];
    if (!empty($replyTo)) {
        $headers[] = "Reply-To: <$replyTo>";
    }

    $mime = implode("\r\n", $headers) . "\r\n\r\n" . $html . "\r\n.\r\n";
    fputs($socket, $mime);
    $res = $readResponse();

    $sendCommand("QUIT", 221);
    fclose($socket);
    return true;
}

// 4. Clean Branded HTML Email
$html = '
<div style="font-family: Arial, Helvetica, sans-serif; max-width: 540px; margin: 0 auto; background-color: #0c1424; border: 1px solid #1e293b; border-radius: 16px; overflow: hidden; color: #ffffff;">
  <div style="padding: 24px; text-align: center; border-bottom: 1px solid #1e293b; background: linear-gradient(180deg, #0f172a 0%, #0c1424 100%);">
    <div style="font-size: 20px; font-weight: 900; letter-spacing: 2px; color: #ffffff; margin-bottom: 4px;">MARKETING<span style="color: #38bdf8;">LU</span></div>
    <div style="font-size: 11px; font-weight: 800; letter-spacing: 1.5px; color: #38bdf8; text-transform: uppercase;">NEW SERVICE ENQUIRY</div>
  </div>
  <div style="padding: 24px;">
    <div style="margin-bottom: 18px;"><div style="font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase;">Customer</div><div style="font-size: 15px; font-weight: 700; color: #ffffff;">' . htmlspecialchars($name) . '</div></div>
    <div style="margin-bottom: 18px;"><div style="font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase;">Email</div><div style="font-size: 14px; font-weight: 600;"><a href="mailto:' . htmlspecialchars($email) . '" style="color: #38bdf8; text-decoration: none;">' . htmlspecialchars($email ?: 'N/A') . '</a></div></div>
    <div style="margin-bottom: 18px;"><div style="font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase;">Phone</div><div style="font-size: 14px; font-weight: 600;"><a href="tel:' . htmlspecialchars($phone) . '" style="color: #38bdf8; text-decoration: none;">' . htmlspecialchars($phone ?: 'N/A') . '</a></div></div>
    <div style="margin-bottom: 18px;"><div style="font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase;">Service</div><div style="font-size: 13px; font-weight: 700; color: #38bdf8; background-color: #0f2b45; padding: 6px 12px; border-radius: 6px; display: inline-block;">' . htmlspecialchars($service) . '</div></div>
    <div style="margin-bottom: 24px;"><div style="font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase;">Requirements</div><div style="font-size: 13px; color: #cbd5e1; background-color: #080d1a; padding: 12px; border-radius: 8px; border: 1px solid #1e293b; line-height: 1.5;">' . nl2br(htmlspecialchars($notes ?: 'None provided')) . '</div></div>
  </div>
  <div style="padding: 14px; text-align: center; background-color: #080d1a; border-top: 1px solid #1e293b; font-size: 11px; color: #64748b;">
    Delivered directly to <strong>' . htmlspecialchars($receiverEmail) . '</strong>
  </div>
</div>';

$subject = "🔥 New Lead: " . $name . " - " . $service;

try {
    try {
        dispatchSmtp('smtp.gmail.com', 465, $smtpUser, $cleanPass, $receiverEmail, "$name (Marketing LU Lead)", $email, $subject, $html);
    } catch (Exception $e1) {
        dispatchSmtp('smtp.gmail.com', 587, $smtpUser, $cleanPass, $receiverEmail, "$name (Marketing LU Lead)", $email, $subject, $html);
    }

    echo json_encode([
        'success' => true,
        'message' => "Inquiry successfully received and routed to $receiverEmail. Our team will contact you shortly!",
        'receiverEmail' => $receiverEmail,
        'inquiryId' => substr(md5(uniqid()), 0, 16),
        'timestamp' => date('c'),
    ]);
} catch (Exception $e) {
    // Ultimate fallback via PHP standard mail()
    $headers = "MIME-Version: 1.0\r\nContent-Type: text/html; charset=UTF-8\r\nFrom: $smtpUser\r\n";
    if (!empty($email)) $headers .= "Reply-To: $email\r\n";
    $sent = @mail($receiverEmail, $subject, $html, $headers);

    if ($sent) {
        echo json_encode([
            'success' => true,
            'message' => "Inquiry successfully received and routed to $receiverEmail.",
            'receiverEmail' => $receiverEmail,
            'inquiryId' => substr(md5(uniqid()), 0, 16),
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => $e->getMessage(),
            'receiverEmail' => $receiverEmail,
        ]);
    }
}
