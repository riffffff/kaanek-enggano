<?php

namespace App\Filament\Resources\VillageResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;

class HomestaysRelationManager extends RelationManager
{
    protected static string $relationship = 'homestays';

    protected static ?string $recordTitleAttribute = 'name';

    protected static ?string $title = 'Homestay';

    public function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('name')
                ->label('Nama homestay')
                ->required()
                ->maxLength(255),
            Forms\Components\TextInput::make('owner')
                ->label('Pemilik')
                ->required()
                ->maxLength(255),
            Forms\Components\TextInput::make('whatsapp_number')
                ->label('WhatsApp')
                ->tel()
                ->required()
                ->maxLength(255),
            Forms\Components\TextInput::make('price_per_night')
                ->label('Harga per malam')
                ->numeric()
                ->prefix('Rp'),
            Forms\Components\Textarea::make('facilities')
                ->label('Fasilitas')
                ->rows(3)
                ->columnSpanFull(),
            SpatieMediaLibraryFileUpload::make('photos')
                ->label('Foto homestay')
                ->collection('photos')
                ->image()
                ->imageEditor()
                ->multiple()
                ->reorderable()
                ->columnSpanFull(),
        ])->columns(2);
    }

    public function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\SpatieMediaLibraryImageColumn::make('photos')
                    ->label('Foto')
                    ->collection('photos')
                    ->square(),
                Tables\Columns\TextColumn::make('name')
                    ->label('Homestay')
                    ->searchable(),
                Tables\Columns\TextColumn::make('owner')
                    ->label('Pemilik')
                    ->searchable(),
                Tables\Columns\TextColumn::make('price_per_night')
                    ->money('IDR', locale: 'id')
                    ->sortable(),
            ])
            ->headerActions([
                Tables\Actions\CreateAction::make(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }
}
