<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ShipScheduleResource\Pages\CreateShipSchedule;
use App\Filament\Resources\ShipScheduleResource\Pages\EditShipSchedule;
use App\Filament\Resources\ShipScheduleResource\Pages\ListShipSchedules;
use App\Models\ShipSchedule;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class ShipScheduleResource extends Resource
{
    protected static ?string $model = ShipSchedule::class;

    protected static ?string $navigationIcon = 'heroicon-o-truck';

    protected static ?string $navigationGroup = 'Operasional Wisata';

    protected static ?int $navigationSort = 2;

    protected static ?string $modelLabel = 'Jadwal transportasi';

    protected static ?string $pluralModelLabel = 'Jadwal transportasi';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Jadwal')
                    ->schema([
                        Forms\Components\Select::make('type')
                            ->options([
                                'ferry' => 'Ferry',
                                'susi_air' => 'Susi Air',
                            ])
                            ->required(),
                        Forms\Components\TextInput::make('route')
                            ->label('Rute')
                            ->required(),
                        Forms\Components\TagsInput::make('days')
                            ->label('Hari operasi')
                            ->required(),
                        Forms\Components\TimePicker::make('departure_time')
                            ->label('Jam berangkat')
                            ->seconds(false)
                            ->required(),
                        Forms\Components\TextInput::make('estimated_price')
                            ->label('Estimasi harga')
                            ->numeric()
                            ->prefix('Rp'),
                        Forms\Components\TextInput::make('ticket_link')
                            ->label('Link tiket')
                            ->url(),
                        Forms\Components\TextInput::make('agent_whatsapp_number')
                            ->label('WhatsApp agen')
                            ->tel(),
                        Forms\Components\Toggle::make('is_active')
                            ->label('Aktif')
                            ->default(true)
                            ->required(),
                    ])
                    ->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('type')
                    ->label('Moda')
                    ->badge()
                    ->searchable(),
                Tables\Columns\TextColumn::make('route')
                    ->label('Rute')
                    ->searchable(),
                Tables\Columns\TextColumn::make('days')
                    ->badge(),
                Tables\Columns\TextColumn::make('departure_time')
                    ->label('Berangkat')
                    ->time('H:i'),
                Tables\Columns\TextColumn::make('estimated_price')
                    ->money('IDR', locale: 'id')
                    ->sortable(),
                Tables\Columns\TextColumn::make('agent_whatsapp_number')
                    ->label('WA Agen')
                    ->searchable(),
                Tables\Columns\IconColumn::make('is_active')
                    ->label('Aktif')
                    ->boolean(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListShipSchedules::route('/'),
            'create' => CreateShipSchedule::route('/create'),
            'edit' => EditShipSchedule::route('/{record}/edit'),
        ];
    }
}
