//axios import buraya gelecek

const { default: axios } = require("axios");

var benimIP;

// ------------ değiştirmeyin --------------
// licensed to Ergineer 2022
require("babel-core/register");
require("babel-polyfill");
async function ipAdresimiAl() {
  await axios({
    method: "get",
    url: "https://apis.ergineer.com/ipadresim",
  })
    .then(function (response) {
      return response.data;
    })
    .then(function (a) {
      benimIP = a;
    });
}
// ------------ değiştirmeyin --------------

const IPadresim = "44.198.171.161";

/*
	ADIM 1: axios kullanarak, aşağıdaki URL'ye GET sorgusu atacağız
    (tag içindeki yere kendi ipnizi yazarak URL'yi oluşturun):
    https://apis.ergineer.com/ipgeoapi/<ipniz>
	
	NOT: Bilgisayarın IP adresini öğrenmek için: https://apis.ergineer.com/ipadresim 
	ADIM 5'e gelene kadar fonksiyonunuzu test etmek için ip nizi URL'ye manuel olarak ekleyebilirsiniz.
*/

/*
	ADIM 2: Geri döndürülen verileri inceleyin, bu sizin ip bilgileriniz! Bileşen fonksiyonunuzu geliştirmek içindeki bu veri yapısını
	iyice anlamanız gerekmektedir.
	
*/
/*
	ADIM 3: Argümanı sadece 1 nesne kabül eden bir fonksiyon oluşturun.
    DOM metotlarını ve özelliklerini kullanarak, şunları gerçekleştirin:
	
	<div class="card">
	<img src={ülke bayrağı url} />
	<div class="card-info">
		<h3 class="ip">{ip adresi}</h3>
		<p class="ulke">{ülke bilgisi (ülke kodu)}</p>
		<p>Enlem: {enlem} Boylam: {boylam}</p>
		<p>Şehir: {şehir}</p>
		<p>Saat dilimi: {saat dilimi}</p>
		<p>Para birimi: {para birimi}</p>
		<p>ISP: {isp}</p>
	</div>
    </div>
*/

/*
	ADIM 4: API'den alınan verileri kullanarak ADIM 3'te verilen yapıda bir kart oluşturun ve 
	bu kartı DOM olarak .cards elementinin içine ekleyin. 
*/

/*
	ADIM 5: Manuel olarak eklediğiniz IP adresini dinamiğe dönüştürün. 
	Sayfanın en üstünde ---değiştirmeyin--- etiketleri arasında yer alan asenkron ipAdresimiAl() fonksiyonuna 
	sorgu atarak bilgisayarınız IP adresini dinamik olarak aldıracaksınız. Bu fonksiyon asenkron olarak çağırıldığında `benimIP` değişkenine 
	bilgisayarınızın IP adresini atayacaktır. 
	Örnek dinamik URL kullanımı: var url = "https://apis.ergineer.com/ipgeoapi/"+benimIP; 

	<div class="card">
	<img src={ülke bayrağı url} />
	<div class="card-info">
		<h3 class="ip">{ip adresi}</h3>
		<p class="ulke">{ülke bilgisi (ülke kodu)}</p>
		<p>Enlem: {enlem} Boylam: {boylam}</p>
		<p>Şehir: {şehir}</p>
		<p>Saat dilimi: {saat dilimi}</p>
		<p>Para birimi: {para birimi}</p>
		<p>ISP: {isp}</p>
	</div>
    </div>
*/

//kodlar buraya gelecek

function cardmaker(cardObj) {
  const card = document.createElement("div");
  const ulkeBayragi = document.createElement("img");
  const cardinfo = document.createElement("div");
  const ipAdresi = document.createElement("h3");
  const ulke = document.createElement("p");
  const enlemBoylam = document.createElement("p");
  const sehir = document.createElement("p");
  const saatDilimi = document.createElement("p");
  const parabr = document.createElement("p");
  const isp = document.createElement("p");

  card.classList.add("card");
  cardinfo.classList.add("card-info");
  ipAdresi.classList.add("ip");
  ulke.classList.add("ulke");

  ulkeBayragi.src = cardObj.ülkebayrağı;
  ipAdresi.textContent = cardObj.sorgu;
  ulke.textContent = `${cardObj.ülke} ${cardObj.ülkeKodu}`;
  enlemBoylam.textContent = `Enlem: ${cardObj.enlem} Boylam: ${cardObj.boylam}`;
  sehir.textContent = cardObj.şehir;
  saatDilimi.textContent = cardObj.saatdilimi;
  parabr.textContent = cardObj.parabirimi;
  isp.textContent = cardObj.isp;

  cardinfo.append(ipAdresi, ulke, enlemBoylam, sehir, saatDilimi, parabr, isp);
  card.append(ulkeBayragi, cardinfo);

  document.querySelector(".cards").appendChild(card);

  return card;
}

let ipObj = {};
async function lokasyonBilgileri(ipAd) {
  await axios
    .get(`https://apis.ergineer.com/ipgeoapi/${ipAd}`)
    .then(function (response) {
      ipObj = response.data;
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
      cards = cardmaker(ipObj);
    });
}

const APICycle = async () => {
  await ipAdresimiAl();

  lokasyonBilgileri(benimIP);
};

APICycle();
