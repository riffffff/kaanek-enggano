<?php

namespace App\Filament\Resources;

use App\Filament\Resources\HomestayResource\Pages\CreateHomestay;
use App\Filament\Resources\HomestayResource\Pages\EditHomestay;
use App\Filament\Resources\HomestayResource\Pages\ListHomestays;
use App\Models\Homestay;
use Filament\Forms;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class HomestayResource extends Resource
{
    protected static ?string $model = Homestay::class;

    protected static ?string $navigationIcon = 'heroicon-o-home-modern';

    protected static ?string $navigationGroup = 'Konten Dinamis';

    protected static ?int $navigationSort = 5;

    protected static ?string $modelLabel = 'Homestay';

    protected static ?string $pluralModelLabel = 'Homestay';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Informasi Homestay')
                    ->schema([
                        Forms\Components\TextInput::make('name')
                            ->label('Nama homestay')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('owner')
                            ->label('Nama pemilik')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\Select::make('village_id')
                            ->label('Desa')
                            ->relationship('village', 'name')
                            ->searchable()
                            ->preload(),
                        Forms\Components\TextInput::make('whatsapp_number')
                            ->label('Nomor WhatsApp')
                            ->tel()
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('price_per_night')
                            ->label('Harga per malam')
                            ->numeric()
                            ->prefix('Rp'),
                        Forms\Components\Textarea::make('description')
                            ->label('Deskripsi')
                            ->rows(4)
                            ->columnSpanFull(),
                        Forms\Components\Textarea::make('facilities')
                            ->label('Fasilitas')
                            ->helperText('Pisahkan dengan koma, contoh: 2 Kamar Tidur, Kamar Mandi Dalam, Sarapan')
                            ->rows(3)
                            ->columnSpanFull(),
                    ])
                    ->columns(2),
                Forms\Components\Section::make('Cover & Galeri')
                    ->schema([
                        SpatieMediaLibraryFileUpload::make('cover')
                            ->label('Cover / Background Header Homestay')
                            ->helperText('Gambar UTAMA (1 gambar) yang tampil sebagai background hero header halaman detail homestay & cover card di daftar Accommodations.')
                            ->collection('cover')
                            ->image()
                            ->imageEditor()
                            ->maxSize(256 * 1024)
                            ->required()
                            ->columnSpanFull(),
                        SpatieMediaLibraryFileUpload::make('photos')
                            ->label('Galeri foto homestay')
                            ->helperText('Foto kamar, fasilitas, area sekitar homestay (bisa banyak). Tampil di section "Galeri Homestay" halaman detail.')
                            ->collection('photos')
                            ->image()
                            ->maxSize(256 * 1024)
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
                Tables\Columns\SpatieMediaLibraryImageColumn::make('cover')
                    ->label('Cover')
                    ->collection('cover')
                    ->square(),
                Tables\Columns\TextColumn::make('name')
                    ->label('Homestay')
                    ->searchable(),
                Tables\Columns\TextColumn::make('village.name')
                    ->label('Desa')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('owner')
                    ->label('Pemilik')
                    ->searchable(),
                Tables\Columns\TextColumn::make('whatsapp_number')
                    ->label('WhatsApp')
                    ->searchable(),
                Tables\Columns\TextColumn::make('price_per_night')
                    ->money('IDR', locale: 'id')
                    ->sortable(),
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
            'index' => ListHomestays::route('/'),
            'create' => CreateHomestay::route('/create'),
            'edit' => EditHomestay::route('/{record}/edit'),
        ];
    }
}

