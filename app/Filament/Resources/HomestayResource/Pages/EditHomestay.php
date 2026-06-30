<?php

namespace App\Filament\Resources\HomestayResource\Pages;

use App\Filament\Resources\HomestayResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditHomestay extends EditRecord
{
    protected static string $resource = HomestayResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
