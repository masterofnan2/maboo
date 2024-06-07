<?php

namespace App\Enums;

enum OrderStatuses: int
{
    case CANCELLED = 0;
    case PROCESSING = 1;
    case CONFIRMED = 2;
    case DELIVERED = 3;
    case CLOSED = 4;
}