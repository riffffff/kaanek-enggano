<?php

namespace App\Filament\Resources\VillageResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;

class UmkmsRelationManager extends RelationManager
{
    protected static string $relationship = 'umkms';

    protected static ?string $recordTitleAttribute = 'business_name';

    protected static ?string $title = 'UMKM';

    public function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('business_name')
                ->label('Nama usaha')
                ->required()
                ->maxLength(255),
            Forms\Components\TextInput::make('owner_name')
                ->label('Pemilik')
                ->required()
                ->maxLength(255),
            Forms\Components\TextInput::make('business_type')
                ->label('Jenis usaha')
                ->required()
                ->maxLength(255),
            Forms\Components\TextInput::make('whatsapp_number')
                ->label('WhatsApp')
                ->tel()
                ->required()
                ->maxLength(255),
            Forms\Components\Textarea::make('notes')
                ->label('Deskripsi')
                ->rows(4)
                ->columnSpanFull(),
            SpatieMediaLibraryFileUpload::make('product_photos')
                ->label('Foto produk')
                ->collection('product_photos')
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
                Tables\Columns\SpatieMediaLibraryImageColumn::make('product_photos')
                    ->label('Foto')
                    ->collection('product_photos')
                    ->square(),
                Tables\Columns\TextColumn::make('business_name')
                    ->label('Usaha')
                    ->searchable(),
                Tables\Columns\TextColumn::make('owner_name')
                    ->label('Pemilik')
                    ->searchable(),
                Tables\Columns\TextColumn::make('business_type')
                    ->label('Jenis')
                    ->badge(),
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
