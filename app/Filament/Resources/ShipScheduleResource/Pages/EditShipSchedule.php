<?php

namespace App\Filament\Resources\ShipScheduleResource\Pages;

use App\Filament\Resources\ShipScheduleResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditShipSchedule extends EditRecord
{
    protected static string $resource = ShipScheduleResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
