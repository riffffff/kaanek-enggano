<?php

namespace App\Filament\Resources;

use App\Filament\Resources\KknLogItemResource\Pages\CreateKknLogItem;
use App\Filament\Resources\KknLogItemResource\Pages\EditKknLogItem;
use App\Filament\Resources\KknLogItemResource\Pages\ListKknLogItems;
use App\Models\KknLogItem;
use Filament\Forms;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class KknLogItemResource extends Resource
{
    protected static ?string $model = KknLogItem::class;

    protected static ?string $navigationIcon = 'heroicon-o-document-text';

    protected static ?string $navigationGroup = 'Konten Dinamis';

    protected static ?int $navigationSort = 2;

    protected static ?string $modelLabel = 'Aktivitas';

    protected static ?string $pluralModelLabel = 'Aktivitas';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Metadata')
                    ->schema([
                        Forms\Components\TextInput::make('title')
                            ->label('Judul')
                            ->required()
                            ->live(onBlur: true)
                            ->afterStateUpdated(fn ($state, Forms\Set $set) => $set('slug', Str::slug((string) $state)))
                            ->maxLength(255),
                        Forms\Components\TextInput::make('slug')
                            ->required()
                            ->unique(ignoreRecord: true)
                            ->maxLength(255),
                        Forms\Components\Select::make('category')
                            ->label('Kategori')
                            ->options([
                                'ekonomi' => 'Ekonomi',
                                'kesehatan' => 'Kesehatan',
                                'digitalisasi' => 'Digitalisasi',
                                'lingkungan' => 'Lingkungan',
                            ])
                            ->required(),
                        Forms\Components\DatePicker::make('date')
                            ->label('Tanggal')
                            ->required(),
                    ])
                    ->columns(2),
                Forms\Components\Section::make('Konten')
                    ->schema([
                        Forms\Components\Textarea::make('content')
                            ->label('Isi artikel')
                            ->required()
                            ->rows(12)
                            ->columnSpanFull(),
                        SpatieMediaLibraryFileUpload::make('photos')
                            ->label('Cover / galeri')
                            ->collection('photos')
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
                Tables\Columns\SpatieMediaLibraryImageColumn::make('photos')
                    ->label('Cover')
                    ->collection('photos')
                    ->square(),
                Tables\Columns\TextColumn::make('title')
                    ->label('Judul')
                    ->searchable(),
                Tables\Columns\TextColumn::make('category')
                    ->badge()
                    ->searchable(),
                Tables\Columns\TextColumn::make('date')
                    ->label('Tanggal')
                    ->date('d M Y')
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
            'index' => ListKknLogItems::route('/'),
            'create' => CreateKknLogItem::route('/create'),
            'edit' => EditKknLogItem::route('/{record}/edit'),
        ];
    }
}
