<?php

namespace App\Filament\Resources\KknLogItemResource\Pages;

use App\Filament\Resources\KknLogItemResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListKknLogItems extends ListRecords
{
    protected static string $resource = KknLogItemResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
