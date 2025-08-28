<?php

namespace App\Handlers;

use Endroid\QrCode\Color\Color;
use Endroid\QrCode\Encoding\Encoding;
use Endroid\QrCode\ErrorCorrectionLevel;
use Endroid\QrCode\QrCode;
use Endroid\QrCode\Label\Label;
use Endroid\QrCode\Logo\Logo;
use Endroid\QrCode\RoundBlockSizeMode;
use Endroid\QrCode\Writer\PngWriter;
use Endroid\QrCode\Writer\Result\PngResult;
use Endroid\QrCode\Writer\ValidationException;
use Exception;

class QRCodeHandler
{
    private string $content;
    private ?QrCode $qrCode = null;
    private PngWriter $writer;
    private $qrResult = null;

    function __construct(
        string $content,
        array $codeParams=[]
    )
    {
        $this->content = $content;
        $this->codeParams = $codeParams;

        $this->writer = new PngWriter();
        $this->codeGenerate();
    }

    public function codeGenerate()
    {

        $qrCode = new QrCode(
            data: $this->content,
            encoding: new Encoding('UTF-8'),
            errorCorrectionLevel: ErrorCorrectionLevel::Low,
            size: 300,
            margin: 10,
            roundBlockSizeMode: RoundBlockSizeMode::Margin,
            foregroundColor: new Color(0, 0, 0),
            backgroundColor: new Color(255, 255, 255)
        );
        
        $this->qrCode = $qrCode;
        $this->qrResult = $this->writer->write($qrCode);

        return $this->qrResult;
    }

    public function getCode()
    {
        return $this->qrResult->getDataUri();
    }
}