<?php

namespace App\Filament\Resources\HomestayResource\Pages;

use App\Filament\Resources\HomestayResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListHomestays extends ListRecords
{
    protected static string $resource = HomestayResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
