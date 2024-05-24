<?php
use Symfony\Component\HttpKernel\Exception\HttpException;

function debug_var($variable)
{
    throw new HttpException(300, print_r($variable));
}