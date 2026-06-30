<?php

namespace App\Filament\Resources;

use App\Filament\Resources\VillageResource\RelationManagers\HomestaysRelationManager;
use App\Filament\Resources\VillageResource\RelationManagers\UmkmsRelationManager;
use App\Filament\Resources\VillageResource\Pages;
use App\Models\Village;
use Filament\Forms;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class VillageResource extends Resource
{
    protected static ?string $model = Village::class;

    protected static ?string $navigationIcon = 'heroicon-o-map';

    protected static ?string $navigationGroup = 'Konten Publik';

    protected static ?int $navigationSort = 1;

    protected static ?string $modelLabel = 'Desa';

    protected static ?string $pluralModelLabel = 'Desa';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Informasi Utama')
                    ->schema([
                        Forms\Components\TextInput::make('name')
                            ->label('Nama desa')
                            ->required()
                            ->live(onBlur: true)
                            ->afterStateUpdated(fn ($state, Forms\Set $set) => $set('slug', Str::slug((string) $state)))
                            ->maxLength(255),
                        Forms\Components\TextInput::make('slug')
                            ->required()
                            ->unique(ignoreRecord: true)
                            ->maxLength(255),
                        Forms\Components\TextInput::make('tribe')
                            ->label('Suku dominan')
                            ->maxLength(255),
                        Forms\Components\Textarea::make('summary')
                            ->label('Ringkasan')
                            ->rows(3)
                            ->columnSpanFull(),
                    ])
                    ->columns(2),
                Forms\Components\Section::make('Narasi Desa')
                    ->schema([
                        Forms\Components\Textarea::make('history')
                            ->label('Sejarah')
                            ->rows(5)
                            ->columnSpanFull(),
                        Forms\Components\Textarea::make('traditions')
                            ->label('Tradisi')
                            ->rows(5)
                            ->columnSpanFull(),
                        Forms\Components\Textarea::make('potential')
                            ->label('Potensi utama')
                            ->helperText('Pisahkan dengan koma, contoh: Bahari, Budaya, UMKM')
                            ->rows(3)
                            ->columnSpanFull(),
                    ]),
                Forms\Components\Section::make('Lokasi & Media')
                    ->schema([
                        Forms\Components\TextInput::make('lat')
                            ->label('Latitude')
                            ->numeric(),
                        Forms\Components\TextInput::make('lng')
                            ->label('Longitude')
                            ->numeric(),
                        SpatieMediaLibraryFileUpload::make('photos')
                            ->label('Foto desa')
                            ->collection('photos')
                            ->image()
                            ->imageEditor()
                            ->multiple()
                            ->reorderable()
                            ->columnSpanFull(),
                    ])
                    ->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\SpatieMediaLibraryImageColumn::make('photos')
                    ->label('Foto')
                    ->collection('photos')
                    ->circular(),
                Tables\Columns\TextColumn::make('name')
                    ->label('Desa')
                    ->searchable(),
                Tables\Columns\TextColumn::make('summary')
                    ->limit(50)
                    ->searchable(),
                Tables\Columns\TextColumn::make('tribe')
                    ->label('Suku')
                    ->searchable(),
                Tables\Columns\TextColumn::make('potential')
                    ->label('Potensi')
                    ->limit(40),
                Tables\Columns\TextColumn::make('lat')
                    ->numeric()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('lng')
                    ->numeric()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
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
            HomestaysRelationManager::class,
            UmkmsRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListVillages::route('/'),
            'create' => Pages\CreateVillage::route('/create'),
            'edit' => Pages\EditVillage::route('/{record}/edit'),
        ];
    }
}
