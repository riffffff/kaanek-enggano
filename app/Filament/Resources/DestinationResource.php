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

    protected static ?string $navigationGroup = 'Konten Publik';

    protected static ?int $navigationSort = 2;

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
                        Forms\Components\Select::make('difficulty_level')
                            ->options([
                                'mudah' => 'Mudah',
                                'sedang' => 'Sedang',
                                'sulit' => 'Sulit',
                            ])
                            ->required(),
                        Forms\Components\Select::make('local_guide_id')
                            ->label('Local guide')
                            ->relationship('localGuide', 'name')
                            ->searchable()
                            ->preload(),
                        Forms\Components\Textarea::make('short_description')
                            ->label('Deskripsi singkat')
                            ->required()
                            ->rows(3)
                            ->columnSpanFull(),
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
                Forms\Components\Section::make('Lokasi & Media')
                    ->schema([
                        Forms\Components\TextInput::make('lat')
                            ->label('Latitude')
                            ->numeric(),
                        Forms\Components\TextInput::make('lng')
                            ->label('Longitude')
                            ->numeric(),
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
                Tables\Columns\TextColumn::make('short_description')
                    ->label('Ringkasan')
                    ->limit(50)
                    ->searchable(),
                Tables\Columns\TextColumn::make('type')
                    ->badge()
                    ->searchable(),
                Tables\Columns\TextColumn::make('difficulty_level')
                    ->label('Kesulitan')
                    ->badge()
                    ->searchable(),
                Tables\Columns\TextColumn::make('localGuide.name')
                    ->label('Guide')
                    ->searchable()
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
            'index' => Pages\ListDestinations::route('/'),
            'create' => Pages\CreateDestination::route('/create'),
            'edit' => Pages\EditDestination::route('/{record}/edit'),
        ];
    }
}
