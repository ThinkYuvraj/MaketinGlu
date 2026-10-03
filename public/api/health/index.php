<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

echo json_encode([
    'status' => 'ok',
    'service' => 'MarketinGlu Native API Engine',
    'environment' => 'production',
    'inquiryEndpoint' => '/api/inquiry',
    'testEmailEndpoint' => '/api/test-email',
    'time' => date('c'),
]);
