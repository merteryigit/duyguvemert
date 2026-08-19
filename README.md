# Duygu — 2026

Mobil öncelikli, statik kişisel albüm microsite'ı. Herhangi bir framework veya dependency kullanmaz; GitHub Pages üzerinde doğrudan yayınlanabilir.

## Yerelde çalıştırma

Proje kökünde bir statik sunucu başlat:

```sh
python3 -m http.server 8080
```

Ardından `http://localhost:8080` adresini aç.

## Albümü kişiselleştirme

- Albüm adı, mesaj ve temel metinler: `index.html`
- Şarkı başlıkları ve ses kaynakları: `script.js` içindeki `album.tracks`
- Kapak: `assets/cover.svg` dosyasını aynı isimle kendi kapak görselinle değiştir. JPG/WEBP kullanacaksan `index.html` içindeki uzantıyı da güncelle.
- Sesler: şimdilik `music/` altında beklenen isimleri kullanır. Gerçek dosyalar eklendiğinde veya başka bir host'a taşındığında yalnızca `src` alanlarını değiştirmen yeterli.

`music/` veya uzak host fark etmeksizin ses dosyalarına doğrudan URL ile erişilebildiğini ve doğru CORS başlıklarıyla sunulduğunu doğrula. Public bir siteye konan ses URL'leri URL'yi bilen kişilerce indirilebilir; bu yöntem gizli dağıtım sağlamaz.

## Privacy

`index.html` içindeki robots meta etiketleri ve `robots.txt`, arama motorlarına siteyi indekslememelerini söyler. Bu bir erişim kontrolü değildir; bağlantıyı bilen herkes siteyi açabilir.

## GitHub Pages ve domain — sonra

1. Repository'yi GitHub'a push et.
2. GitHub repository ayarlarından **Pages** bölümünde branch olarak `main` ve kaynak olarak `/ (root)` seç.
3. Pages URL'si üzerinde siteyi ve ses isteklerini test et.
4. Sonra GitHub Pages'teki **Custom domain** alanına `www.duyguvemert.com` gir; GitHub'ın göstereceği DNS kaydını TurkTicaret.net tarafında ekle ve HTTPS tamamlanmasını bekle.

Bu repoda DNS, CNAME veya deployment ayarı yapılmamıştır.
