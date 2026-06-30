<?php

namespace Database\Seeders;

use App\Models\Village;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class VillageSeeder extends Seeder
{
    public function run(): void
    {
        $villages = [
            [
                'name' => 'Enggano',
                'tribe' => 'Kauno',
                'summary' => 'Membawa nama pulau, desa ini merawat situs-situs bersejarah dan cerita lisan masa lampau.',
                'history' => 'Desa Enggano dikenal sebagai salah satu simpul narasi sejarah pulau. Banyak pengetahuan lisan dan jejak lama masih dirawat oleh keluarga-keluarga setempat.',
                'traditions' => 'Tradisi tutur, tata ruang kampung, dan relasi antarwarga tetap menjadi bagian penting dari kehidupan sehari-hari.',
                'potential' => 'Budaya, sejarah, wisata edukasi',
                'lat' => -5.4001,
                'lng' => 102.2822,
            ],
            [
                'name' => 'Kahyapu',
                'tribe' => 'Kaahua',
                'summary' => 'Pintu gerbang laut Enggano dengan pelabuhan utama yang menjadi pusat aktivitas ekonomi awal.',
                'history' => 'Kahyapu berkembang sebagai titik kedatangan utama dari Bengkulu. Mobilitas barang, penumpang, dan informasi banyak bermula dari desa ini.',
                'traditions' => 'Kehidupan warga berpaut erat dengan ritme laut, aktivitas pelabuhan, dan solidaritas antarkeluarga pesisir.',
                'potential' => 'Transportasi, bahari, perdagangan lokal',
                'lat' => -5.3824,
                'lng' => 102.1983,
            ],
            [
                'name' => 'Kaana',
                'tribe' => 'Kaana',
                'summary' => 'Dikenal dengan keindahan pesisir dan masyarakat agraris yang mempertahankan tradisi leluhur.',
                'history' => 'Kaana tumbuh sebagai ruang hidup yang mempertemukan bentang pantai dengan praktik pertanian dan pengetahuan lokal turun-temurun.',
                'traditions' => 'Tradisi kerja komunal dan penghormatan pada musim panen masih menjadi bagian penting dalam kehidupan desa.',
                'potential' => 'Pesisir, pertanian, budaya',
                'lat' => -5.3712,
                'lng' => 102.2278,
            ],
            [
                'name' => 'Meok',
                'tribe' => 'Meok',
                'summary' => 'Desa nelayan dengan pesona garis pantai terpanjang, menawarkan pemandangan samudra yang tak berujung.',
                'history' => 'Meok dikenal dari tradisi hidup maritim yang kuat. Aktivitas melaut dan pembacaan musim menjadi pengetahuan penting yang diwariskan antargenerasi.',
                'traditions' => 'Ritme kehidupan desa mengikuti laut, cuaca, serta kebiasaan gotong royong dalam pengolahan hasil tangkapan.',
                'potential' => 'Perikanan, panorama pantai, wisata bahari',
                'lat' => -5.4168,
                'lng' => 102.2462,
            ],
            [
                'name' => 'Apoho',
                'tribe' => 'Apoho',
                'summary' => 'Tersembunyi di rimbunnya hutan, desa ini menyimpan kekayaan flora dan fauna endemik yang memukau.',
                'history' => 'Apoho sering dipandang sebagai salah satu desa yang paling kuat menyimpan lapisan pengetahuan adat dan kedekatan dengan lanskap hutan Enggano.',
                'traditions' => 'Cerita adat, pola bangunan rumah, dan hubungan dengan hutan masih menjadi bagian dari identitas desa.',
                'potential' => 'Alam, budaya, konservasi',
                'lat' => -5.3627,
                'lng' => 102.2605,
            ],
            [
                'name' => 'Malakoni',
                'tribe' => 'Malakoni',
                'summary' => 'Pusat pemerintahan dan denyut nadi komunitas, tempat bertemunya berbagai suku lokal.',
                'history' => 'Sebagai pusat pemerintahan, Malakoni menjadi titik temu beragam kepentingan publik, layanan, dan aktivitas sosial warga dari berbagai desa.',
                'traditions' => 'Interaksi lintas komunitas membentuk tradisi sosial yang cair, aktif, dan dekat dengan kegiatan administrasi pulau.',
                'potential' => 'Layanan publik, budaya, ekonomi jasa',
                'lat' => -5.3896,
                'lng' => 102.2417,
            ],
        ];

        foreach ($villages as $village) {
            Village::query()->updateOrCreate(
                ['name' => $village['name']],
                [
                    'slug' => Str::slug($village['name']),
                    'tribe' => $village['tribe'],
                    'summary' => $village['summary'],
                    'history' => $village['history'],
                    'traditions' => $village['traditions'],
                    'potential' => $village['potential'],
                    'lat' => $village['lat'],
                    'lng' => $village['lng'],
                ]
            );
        }
    }
}
