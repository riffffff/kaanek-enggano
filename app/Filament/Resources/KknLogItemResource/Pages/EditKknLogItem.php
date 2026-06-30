<?php

namespace App\Filament\Resources\KknLogItemResource\Pages;

use App\Filament\Resources\KknLogItemResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditKknLogItem extends EditRecord
{
    protected static string $resource = KknLogItemResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
