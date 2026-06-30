<?php

namespace App\Filament\Resources\LocalGuideResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class DestinationsRelationManager extends RelationManager
{
    protected static string $relationship = 'destinations';

    protected static ?string $recordTitleAttribute = 'name';

    protected static ?string $title = 'Destinasi';

    public function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('name')
                ->label('Nama destinasi')
                ->required()
                ->live(onBlur: true)
                ->afterStateUpdated(fn ($state, Forms\Set $set) => $set('slug', Str::slug((string) $state)))
                ->maxLength(255),
            Forms\Components\TextInput::make('slug')
                ->required()
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
            Forms\Components\Textarea::make('short_description')
                ->label('Deskripsi singkat')
                ->required()
                ->rows(3)
                ->columnSpanFull(),
            Forms\Components\Textarea::make('description')
                ->label('Deskripsi utama')
                ->required()
                ->rows(6)
                ->columnSpanFull(),
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
                    ->label('Destinasi')
                    ->searchable(),
                Tables\Columns\TextColumn::make('type')
                    ->badge(),
                Tables\Columns\TextColumn::make('difficulty_level')
                    ->label('Kesulitan')
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
