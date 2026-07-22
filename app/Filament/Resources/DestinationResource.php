<?php

namespace App\Filament\Resources;

use App\Filament\Resources\DestinationResource\Pages;
use App\Models\Destination;
use Filament\Forms;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class DestinationResource extends Resource
{
    protected static ?string $model = Destination::class;

    protected static ?string $navigationIcon = 'heroicon-o-map-pin';

    protected static ?string $navigationGroup = 'Konten Dinamis';

    protected static ?int $navigationSort = 1;

    protected static ?string $modelLabel = 'Destinasi';

    protected static ?string $pluralModelLabel = 'Destinasi';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Identitas Destinasi')
                    ->schema([
                        Forms\Components\TextInput::make('name')
                            ->label('Nama destinasi')
                            ->required()
                            ->live(onBlur: true)
                            ->afterStateUpdated(fn ($state, Forms\Set $set) => $set('slug', Str::slug((string) $state)))
                            ->maxLength(255),
                        Forms\Components\TextInput::make('slug')
                            ->required()
                            ->unique(ignoreRecord: true)
                            ->maxLength(255),
                        Forms\Components\Select::make('type')
                            ->options([
                                'bahari' => 'Bahari',
                                'wildlife' => 'Wildlife',
                                'history' => 'History',
                            ])
                            ->required(),
                    ])
                    ->columns(2),
                Forms\Components\Section::make('Konten Editorial')
                    ->schema([
                        Forms\Components\Textarea::make('description')
                            ->label('Deskripsi utama')
                            ->required()
                            ->rows(8)
                            ->columnSpanFull(),
                    ]),
                Forms\Components\Section::make('Expedition Details')
                    ->schema([
                        Forms\Components\Select::make('difficulty_level')
                            ->label('Difficulty')
                            ->options([
                                'mudah' => 'Mudah',
                                'sedang' => 'Sedang',
                                'sulit' => 'Sulit',
                            ])
                            ->required(),
                        Forms\Components\TextInput::make('travel_time')
                            ->label('Travel time')
                            ->placeholder('Contoh: 45 mins from Apoho')
                            ->maxLength(255),
                        Forms\Components\TextInput::make('access_note')
                            ->label('Access')
                            ->placeholder('Contoh: Motorbike & forest trail')
                            ->maxLength(255),
                        Forms\Components\TextInput::make('lat')
                            ->label('Koordinat Latitude')
                            ->helperText('Format Leaflet: -5.389167')
                            ->numeric(),
                        Forms\Components\TextInput::make('lng')
                            ->label('Koordinat Longitude')
                            ->helperText('Format Leaflet: 102.411111')
                            ->numeric(),
                    ])
                    ->columns(2),
                Forms\Components\Section::make('Lokasi & Media')
                    ->schema([
                        SpatieMediaLibraryFileUpload::make('background_photo')
                            ->label('Gambar background')
                            ->collection('background')
                            ->image()
                            ->imageEditor(),
                        SpatieMediaLibraryFileUpload::make('photos')
                            ->label('Galeri destinasi')
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
                    ->square(),
                Tables\Columns\TextColumn::make('name')
                    ->label('Destinasi')
                    ->searchable(),
                Tables\Columns\TextColumn::make('type')
                    ->badge()
                    ->searchable(),
                Tables\Columns\TextColumn::make('difficulty_level')
                    ->label('Kesulitan')
                    ->badge()
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
            'index' => Pages\ListDestinations::route('/'),
            'create' => Pages\CreateDestination::route('/create'),
            'edit' => Pages\EditDestination::route('/{record}/edit'),
        ];
    }
}
