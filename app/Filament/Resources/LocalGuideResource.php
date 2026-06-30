<?php

namespace App\Filament\Resources;

use App\Filament\Resources\LocalGuideResource\Pages\CreateLocalGuide;
use App\Filament\Resources\LocalGuideResource\Pages\EditLocalGuide;
use App\Filament\Resources\LocalGuideResource\Pages\ListLocalGuides;
use App\Filament\Resources\LocalGuideResource\RelationManagers\DestinationsRelationManager;
use App\Models\LocalGuide;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class LocalGuideResource extends Resource
{
    protected static ?string $model = LocalGuide::class;

    protected static ?string $navigationIcon = 'heroicon-o-user-group';

    protected static ?string $navigationGroup = 'Operasional Wisata';

    protected static ?int $navigationSort = 3;

    protected static ?string $modelLabel = 'Local guide';

    protected static ?string $pluralModelLabel = 'Local guide';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Profil Guide')
                    ->schema([
                        Forms\Components\TextInput::make('name')
                            ->label('Nama')
                            ->required(),
                        Forms\Components\TextInput::make('whatsapp_number')
                            ->label('WhatsApp')
                            ->tel()
                            ->required(),
                        Forms\Components\Textarea::make('expertise')
                            ->label('Keahlian')
                            ->rows(4)
                            ->columnSpanFull(),
                    ])
                    ->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->label('Nama')
                    ->searchable(),
                Tables\Columns\TextColumn::make('whatsapp_number')
                    ->label('WhatsApp')
                    ->searchable(),
                Tables\Columns\TextColumn::make('expertise')
                    ->label('Keahlian')
                    ->limit(50),
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
            DestinationsRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListLocalGuides::route('/'),
            'create' => CreateLocalGuide::route('/create'),
            'edit' => EditLocalGuide::route('/{record}/edit'),
        ];
    }
}
