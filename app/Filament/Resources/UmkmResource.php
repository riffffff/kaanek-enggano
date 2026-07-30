<?php

namespace App\Filament\Resources;

use App\Filament\Resources\UmkmResource\Pages\CreateUmkm;
use App\Filament\Resources\UmkmResource\Pages\EditUmkm;
use App\Filament\Resources\UmkmResource\Pages\ListUmkms;
use App\Models\Umkm;
use Filament\Forms;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class UmkmResource extends Resource
{
    protected static ?string $model = Umkm::class;

    protected static ?string $navigationIcon = 'heroicon-o-shopping-bag';

    protected static ?string $navigationGroup = 'Konten Dinamis';

    protected static ?int $navigationSort = 4;

    protected static ?string $modelLabel = 'UMKM';

    protected static ?string $pluralModelLabel = 'UMKM';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Data UMKM')
                    ->schema([
                        Forms\Components\Select::make('village_id')
                            ->label('Desa')
                            ->relationship('village', 'name')
                            ->searchable()
                            ->preload()
                            ->required(),
                        Forms\Components\TextInput::make('business_name')
                            ->label('Nama usaha')
                            ->required(),
                        Forms\Components\TextInput::make('owner_name')
                            ->label('Pemilik')
                            ->required(),
                        Forms\Components\TextInput::make('business_type')
                            ->label('Jenis usaha')
                            ->required(),
                        Forms\Components\TextInput::make('whatsapp_number')
                            ->label('WhatsApp')
                            ->tel()
                            ->required(),
                        Forms\Components\Textarea::make('notes')
                            ->label('Catatan / deskripsi')
                            ->rows(4)
                            ->columnSpanFull(),
                    ])
                    ->columns(2),
                Forms\Components\Section::make('Media')
                    ->schema([
                        SpatieMediaLibraryFileUpload::make('product_photos')
                            ->label('Foto produk')
                            ->collection('product_photos')
                            ->image()
                            ->maxSize(256 * 1024) // 256MB in KB
                            ->multiple()
                            ->reorderable()
                            ->columnSpanFull(),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\SpatieMediaLibraryImageColumn::make('product_photos')
                    ->label('Foto')
                    ->collection('product_photos')
                    ->square(),
                Tables\Columns\TextColumn::make('village.name')
                    ->label('Desa')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('business_name')
                    ->label('Usaha')
                    ->searchable(),
                Tables\Columns\TextColumn::make('owner_name')
                    ->label('Pemilik')
                    ->searchable(),
                Tables\Columns\TextColumn::make('business_type')
                    ->label('Jenis')
                    ->searchable(),
                Tables\Columns\TextColumn::make('whatsapp_number')
                    ->label('WhatsApp')
                    ->searchable(),
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
            'index' => ListUmkms::route('/'),
            'create' => CreateUmkm::route('/create'),
            'edit' => EditUmkm::route('/{record}/edit'),
        ];
    }
}
