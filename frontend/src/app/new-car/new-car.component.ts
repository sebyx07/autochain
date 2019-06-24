import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CarsService} from '../services/cars.service';
import {Message} from 'primeng/api';
import {} from 'node';


const {
  JSORMBase,
  attr,
  belongsTo,
  hasMany
  // etc
} = require("jsorm/dist/jsorm")


const ApplicationRecord = JSORMBase.extend({
  static: {
    baseUrl: "http://localhost:3000",
    apiNamespace: "/api"
  }
})

const Car =  ApplicationRecord.extend({
  static: {
    jsonapiType: "cars"
  },

  attrs: {
    'model': attr(),
    'brand': attr(),
    'firstRegistration': attr(),
    'color': attr(),
    'numberOfKilometers': attr(),
    'priceEuro': attr(),
    'numberOfDoors': attr(),
    'transmissionType': attr(),
    'description': attr(),
    'fuelType': attr(),
    'images' : attr()
  }
})

@Component({
  selector: 'app-new-car',
  templateUrl: './new-car.component.html',
  styleUrls: ['./new-car.component.css']
})
export class NewCarComponent implements OnInit {

  id: string = null;

  msgs: Message[];

  years: any[] = [];
  colors: any[] = [];
  // selectedTransmission: any = null;
  // selectedCombustibil: any
  selectedColor: any = null;
  selectedYear: any = null;
  transmissions: any[] = [];
  transmissionSelected: any = null;
  uploadedFiles: any[] = [];
  public newCarForm: FormGroup;
  types: any[] = [];
  // brandSelected: any = '';
  // modelSelected: any = '';
  cars: any = [
    {"brand":"Seat","models":[{"name":"Alhambra"},{"name":"Altea"},{"name":"Altea XL"},{"name":"Arosa"},{"name":"Cordoba"},{"name":"Cordoba Vario"},{"name":"Exeo"},{"name":"Ibiza"},{"name":"Ibiza ST"},{"name":"Exeo ST"},{"name":"Leon"},{"name":"Leon ST"},{"name":"Inca"},{"name":"Mii"},{"name":"Toledo"}]},
    {"brand":"Renault","models":[{"name":"Captur"},{"name":"Clio"},{"name":"Clio Grandtour"},{"name":"Espace"},{"name":"Express"},{"name":"Fluence"},{"name":"Grand Espace"},{"name":"Grand Modus"},{"name":"Grand Scenic"},{"name":"Kadjar"},{"name":"Kangoo"},{"name":"Kangoo Express"},{"name":"Koleos"},{"name":"Laguna"},{"name":"Laguna Grandtour"},{"name":"Latitude"},{"name":"Mascott"},{"name":"Mégane"},{"name":"Mégane CC"},{"name":"Mégane Combi"},{"name":"Mégane Grandtour"},{"name":"Mégane Coupé"},{"name":"Mégane Scénic"},{"name":"Scénic"},{"name":"Talisman"},{"name":"Talisman Grandtour"},{"name":"Thalia"},{"name":"Twingo"},{"name":"Wind"},{"name":"Zoé"}]},
    {"brand":"Peugeot","models":[{"name":"1007"},{"name":"107"},{"name":"106"},{"name":"108"},{"name":"2008"},{"name":"205"},{"name":"205 Cabrio"},{"name":"206"},{"name":"206 CC"},{"name":"206 SW"},{"name":"207"},{"name":"207 CC"},{"name":"207 SW"},{"name":"306"},{"name":"307"},{"name":"307 CC"},{"name":"307 SW"},{"name":"308"},{"name":"308 CC"},{"name":"308 SW"},{"name":"309"},{"name":"4007"},{"name":"4008"},{"name":"405"},{"name":"406"},{"name":"407"},{"name":"407 SW"},{"name":"5008"},{"name":"508"},{"name":"508 SW"},{"name":"605"},{"name":"806"},{"name":"607"},{"name":"807"},{"name":"Bipper"},{"name":"RCZ"}]},
    {"brand":"Dacia","models":[{"name":"Dokker"},{"name":"Duster"},{"name":"Lodgy"},{"name":"Logan"},{"name":"Logan MCV"},{"name":"Logan Van"},{"name":"Sandero"},{"name":"Solenza"}]},
    {"brand":"Citroën","models":[{"name":"Berlingo"},{"name":"C-Crosser"},{"name":"C-Elissée"},{"name":"C-Zero"},{"name":"C1"},{"name":"C2"},{"name":"C3"},{"name":"C3 Picasso"},{"name":"C4"},{"name":"C4 Aircross"},{"name":"C4 Cactus"},{"name":"C4 Coupé"},{"name":"C4 Grand Picasso"},{"name":"C4 Sedan"},{"name":"C5"},{"name":"C5 Break"},{"name":"C5 Tourer"},{"name":"C6"},{"name":"C8"},{"name":"DS3"},{"name":"DS4"},{"name":"DS5"},{"name":"Evasion"},{"name":"Jumper"},{"name":"Jumpy"},{"name":"Saxo"},{"name":"Nemo"},{"name":"Xantia"},{"name":"Xsara"}]},
    {"brand":"Opel","models":[{"name":"Agila"},{"name":"Ampera"},{"name":"Antara"},{"name":"Astra"},{"name":"Astra cabrio"},{"name":"Astra caravan"},{"name":"Astra coupé"},{"name":"Calibra"},{"name":"Campo"},{"name":"Cascada"},{"name":"Corsa"},{"name":"Frontera"},{"name":"Insignia"},{"name":"Insignia kombi"},{"name":"Kadett"},{"name":"Meriva"},{"name":"Mokka"},{"name":"Movano"},{"name":"Omega"},{"name":"Signum"},{"name":"Vectra"},{"name":"Vectra Caravan"},{"name":"Vivaro"},{"name":"Vivaro Kombi"},{"name":"Zafira"}]},
    {"brand":"Alfa Romeo","models":[{"name":"145"},{"name":"146"},{"name":"147"},{"name":"155"},{"name":"156"},{"name":"156 Sportwagon"},{"name":"159"},{"name":"159 Sportwagon"},{"name":"164"},{"name":"166"},{"name":"4C"},{"name":"Brera"},{"name":"GTV"},{"name":"MiTo"},{"name":"Crosswagon"},{"name":"Spider"},{"name":"GT"},{"name":"Giulietta"},{"name":"Giulia"}]},
    {"brand":"Škoda","models":[{"name":"Favorit"},{"name":"Felicia"},{"name":"Citigo"},{"name":"Fabia"},{"name":"Fabia Combi"},{"name":"Fabia Sedan"},{"name":"Felicia Combi"},{"name":"Octavia"},{"name":"Octavia Combi"},{"name":"Roomster"},{"name":"Yeti"},{"name":"Rapid"},{"name":"Rapid Spaceback"},{"name":"Superb"},{"name":"Superb Combi"}]},
    {"brand":"Chevrolet","models":[{"name":"Alero"},{"name":"Aveo"},{"name":"Camaro"},{"name":"Captiva"},{"name":"Corvette"},{"name":"Cruze"},{"name":"Cruze SW"},{"name":"Epica"},{"name":"Equinox"},{"name":"Evanda"},{"name":"HHR"},{"name":"Kalos"},{"name":"Lacetti"},{"name":"Lacetti SW"},{"name":"Lumina"},{"name":"Malibu"},{"name":"Matiz"},{"name":"Monte Carlo"},{"name":"Nubira"},{"name":"Orlando"},{"name":"Spark"},{"name":"Suburban"},{"name":"Tacuma"},{"name":"Tahoe"},{"name":"Trax"}]},
    {"brand":"Porsche","models":[{"name":"911 Carrera"},{"name":"911 Carrera Cabrio"},{"name":"911 Targa"},{"name":"911 Turbo"},{"name":"924"},{"name":"944"},{"name":"997"},{"name":"Boxster"},{"name":"Cayenne"},{"name":"Cayman"},{"name":"Macan"},{"name":"Panamera"}]},
    {"brand":"Honda","models":[{"name":"Accord"},{"name":"Accord Coupé"},{"name":"Accord Tourer"},{"name":"City"},{"name":"Civic"},{"name":"Civic Aerodeck"},{"name":"Civic Coupé"},{"name":"Civic Tourer"},{"name":"Civic Type R"},{"name":"CR-V"},{"name":"CR-X"},{"name":"CR-Z"},{"name":"FR-V"},{"name":"HR-V"},{"name":"Insight"},{"name":"Integra"},{"name":"Jazz"},{"name":"Legend"},{"name":"Prelude"}]},
    {"brand":"Subaru","models":[{"name":"BRZ"},{"name":"Forester"},{"name":"Impreza"},{"name":"Impreza Wagon"},{"name":"Justy"},{"name":"Legacy"},{"name":"Legacy Wagon"},{"name":"Legacy Outback"},{"name":"Levorg"},{"name":"Outback"},{"name":"SVX"},{"name":"Tribeca"},{"name":"Tribeca B9"},{"name":"XV"}]},
    {"brand":"Mazda","models":[{"name":"121"},{"name":"2"},{"name":"3"},{"name":"323"},{"name":"323 Combi"},{"name":"323 Coupé"},{"name":"323 F"},{"name":"5"},{"name":"6"},{"name":"6 Combi"},{"name":"626"},{"name":"626 Combi"},{"name":"B-Fighter"},{"name":"B2500"},{"name":"BT"},{"name":"CX-3"},{"name":"CX-5"},{"name":"CX-7"},{"name":"CX-9"},{"name":"Demio"},{"name":"MPV"},{"name":"MX-3"},{"name":"MX-5"},{"name":"MX-6"},{"name":"Premacy"},{"name":"RX-7"},{"name":"RX-8"},{"name":"Xedox 6"}]},
    {"brand":"Mitsubishi","models":[{"name":"3000 GT"},{"name":"ASX"},{"name":"Carisma"},{"name":"Colt"},{"name":"Colt CC"},{"name":"Eclipse"},{"name":"Fuso canter"},{"name":"Galant"},{"name":"Galant Combi"},{"name":"Grandis"},{"name":"L200"},{"name":"L200 Pick up"},{"name":"L200 Pick up Allrad"},{"name":"L300"},{"name":"Lancer"},{"name":"Lancer Combi"},{"name":"Lancer Evo"},{"name":"Lancer Sportback"},{"name":"Outlander"},{"name":"Pajero"},{"name":"Pajeto Pinin"},{"name":"Pajero Pinin Wagon"},{"name":"Pajero Sport"},{"name":"Pajero Wagon"},{"name":"Space Star"}]},
    {"brand":"Lexus","models":[{"name":"CT"},{"name":"GS"},{"name":"GS 300"},{"name":"GX"},{"name":"IS"},{"name":"IS 200"},{"name":"IS 250 C"},{"name":"IS-F"},{"name":"LS"},{"name":"LX"},{"name":"NX"},{"name":"RC F"},{"name":"RX"},{"name":"RX 300"},{"name":"RX 400h"},{"name":"RX 450h"},{"name":"SC 430"}]},
    {"brand":"Toyota","models":[{"name":"4-Runner"},{"name":"Auris"},{"name":"Avensis"},{"name":"Avensis Combi"},{"name":"Avensis Van Verso"},{"name":"Aygo"},{"name":"Camry"},{"name":"Carina"},{"name":"Celica"},{"name":"Corolla"},{"name":"Corolla Combi"},{"name":"Corolla sedan"},{"name":"Corolla Verso"},{"name":"FJ Cruiser"},{"name":"GT86"},{"name":"Hiace"},{"name":"Hiace Van"},{"name":"Highlander"},{"name":"Hilux"},{"name":"Land Cruiser"},{"name":"MR2"},{"name":"Paseo"},{"name":"Picnic"},{"name":"Prius"},{"name":"RAV4"},{"name":"Sequoia"},{"name":"Starlet"},{"name":"Supra"},{"name":"Tundra"},{"name":"Urban Cruiser"},{"name":"Verso"},{"name":"Yaris"},{"name":"Yaris Verso"}]},
    {"brand":"BMW","models":[{"name":"i3"},{"name":"i8"},{"name":"M3"},{"name":"M4"},{"name":"M5"},{"name":"M6"},{"name":"Rad 1"},{"name":"Rad 1 Cabrio"},{"name":"Rad 1 Coupé"},{"name":"Rad 2"},{"name":"Rad 2 Active Tourer"},{"name":"Rad 2 Coupé"},{"name":"Rad 2 Gran Tourer"},{"name":"Rad 3"},{"name":"Rad 3 Cabrio"},{"name":"Rad 3 Compact"},{"name":"Rad 3 Coupé"},{"name":"Rad 3 GT"},{"name":"Rad 3 Touring"},{"name":"Rad 4"},{"name":"Rad 4 Cabrio"},{"name":"Rad 4 Gran Coupé"},{"name":"Rad 5"},{"name":"Rad 5 GT"},{"name":"Rad 5 Touring"},{"name":"Rad 6"},{"name":"Rad 6 Cabrio"},{"name":"Rad 6 Coupé"},{"name":"Rad 6 Gran Coupé"},{"name":"Rad 7"},{"name":"Rad 8 Coupé"},{"name":"X1"},{"name":"X3"},{"name":"X4"},{"name":"X5"},{"name":"X6"},{"name":"Z3"},{"name":"Z3 Coupé"},{"name":"Z3 Roadster"},{"name":"Z4"},{"name":"Z4 Roadster"}]},
    {"brand":"Volkswagen","models":[{"name":"Amarok"},{"name":"Beetle"},{"name":"Bora"},{"name":"Bora Variant"},{"name":"Caddy"},{"name":"Caddy Van"},{"name":"Life"},{"name":"California"},{"name":"Caravelle"},{"name":"CC"},{"name":"Crafter"},{"name":"Crafter Van"},{"name":"Crafter Kombi"},{"name":"CrossTouran"},{"name":"Eos"},{"name":"Fox"},{"name":"Golf"},{"name":"Golf Cabrio"},{"name":"Golf Plus"},{"name":"Golf Sportvan"},{"name":"Golf Variant"},{"name":"Jetta"},{"name":"LT"},{"name":"Lupo"},{"name":"Multivan"},{"name":"New Beetle"},{"name":"New Beetle Cabrio"},{"name":"Passat"},{"name":"Passat Alltrack"},{"name":"Passat CC"},{"name":"Passat Variant"},{"name":"Passat Variant Van"},{"name":"Phaeton"},{"name":"Polo"},{"name":"Polo Van"},{"name":"Polo Variant"},{"name":"Scirocco"},{"name":"Sharan"},{"name":"T4"},{"name":"T4 Caravelle"},{"name":"T4 Multivan"},{"name":"T5"},{"name":"T5 Caravelle"},{"name":"T5 Multivan"},{"name":"T5 Transporter Shuttle"},{"name":"Tiguan"},{"name":"Touareg"},{"name":"Touran"}]},
    {"brand":"Suzuki","models":[{"name":"Alto"},{"name":"Baleno"},{"name":"Baleno kombi"},{"name":"Grand Vitara"},{"name":"Grand Vitara XL-7"},{"name":"Ignis"},{"name":"Jimny"},{"name":"Kizashi"},{"name":"Liana"},{"name":"Samurai"},{"name":"Splash"},{"name":"Swift"},{"name":"SX4"},{"name":"SX4 Sedan"},{"name":"Vitara"},{"name":"Wagon R+"}]},
    {"brand":"Mercedes-Benz","models":[{"name":"100 D"},{"name":"115"},{"name":"124"},{"name":"126"},{"name":"190"},{"name":"190 D"},{"name":"190 E"},{"name":"200 - 300"},{"name":"200 D"},{"name":"200 E"},{"name":"210 Van"},{"name":"210 kombi"},{"name":"310 Van"},{"name":"310 kombi"},{"name":"230 - 300 CE Coupé"},{"name":"260 - 560 SE"},{"name":"260 - 560 SEL"},{"name":"500 - 600 SEC Coupé"},{"name":"Trieda A"},{"name":"A"},{"name":"A L"},{"name":"AMG GT"},{"name":"Trieda B"},{"name":"Trieda C"},{"name":"C"},{"name":"C Sportcoupé"},{"name":"C T"},{"name":"Citan"},{"name":"CL"},{"name":"CL"},{"name":"CLA"},{"name":"CLC"},{"name":"CLK Cabrio"},{"name":"CLK Coupé"},{"name":"CLS"},{"name":"Trieda E"},{"name":"E"},{"name":"E Cabrio"},{"name":"E Coupé"},{"name":"E T"},{"name":"Trieda G"},{"name":"G Cabrio"},{"name":"GL"},{"name":"GLA"},{"name":"GLC"},{"name":"GLE"},{"name":"GLK"},{"name":"Trieda M"},{"name":"MB 100"},{"name":"Trieda R"},{"name":"Trieda S"},{"name":"S"},{"name":"S Coupé"},{"name":"SL"},{"name":"SLC"},{"name":"SLK"},{"name":"SLR"},{"name":"Sprinter"}]},
    {"brand":"Saab","models":[{"name":"9-3"},{"name":"9-3 Cabriolet"},{"name":"9-3 Coupé"},{"name":"9-3 SportCombi"},{"name":"9-5"},{"name":"9-5 SportCombi"},{"name":"900"},{"name":"900 C"},{"name":"900 C Turbo"},{"name":"9000"}]},
    {"brand":"Audi","models":[{"name":"100"},{"name":"100 Avant"},{"name":"80"},{"name":"80 Avant"},{"name":"80 Cabrio"},{"name":"90"},{"name":"A1"},{"name":"A2"},{"name":"A3"},{"name":"A3 Cabriolet"},{"name":"A3 Limuzina"},{"name":"A3 Sportback"},{"name":"A4"},{"name":"A4 Allroad"},{"name":"A4 Avant"},{"name":"A4 Cabriolet"},{"name":"A5"},{"name":"A5 Cabriolet"},{"name":"A5 Sportback"},{"name":"A6"},{"name":"A6 Allroad"},{"name":"A6 Avant"},{"name":"A7"},{"name":"A8"},{"name":"A8 Long"},{"name":"Q3"},{"name":"Q5"},{"name":"Q7"},{"name":"R8"},{"name":"RS4 Cabriolet"},{"name":"RS4/RS4 Avant"},{"name":"RS5"},{"name":"RS6 Avant"},{"name":"RS7"},{"name":"S3/S3 Sportback"},{"name":"S4 Cabriolet"},{"name":"S4/S4 Avant"},{"name":"S5/S5 Cabriolet"},{"name":"S6/RS6"},{"name":"S7"},{"name":"S8"},{"name":"SQ5"},{"name":"TT Coupé"},{"name":"TT Roadster"},{"name":"TTS"}]},
    {"brand":"Kia","models":[{"name":"Avella"},{"name":"Besta"},{"name":"Carens"},{"name":"Carnival"},{"name":"Cee`d"},{"name":"Cee`d SW"},{"name":"Cerato"},{"name":"K 2500"},{"name":"Magentis"},{"name":"Opirus"},{"name":"Optima"},{"name":"Picanto"},{"name":"Pregio"},{"name":"Pride"},{"name":"Pro Cee`d"},{"name":"Rio"},{"name":"Rio Combi"},{"name":"Rio sedan"},{"name":"Sephia"},{"name":"Shuma"},{"name":"Sorento"},{"name":"Soul"},{"name":"Sportage"},{"name":"Venga"}]},
    {"brand":"Land Rover","models":[{"name":"109"},{"name":"Defender"},{"name":"Discovery"},{"name":"Discovery Sport"},{"name":"Freelander"},{"name":"Range Rover"},{"name":"Range Rover Evoque"},{"name":"Range Rover Sport"}]},
    {"brand":"Dodge","models":[{"name":"Avenger"},{"name":"Caliber"},{"name":"Challenger"},{"name":"Charger"},{"name":"Grand Caravan"},{"name":"Journey"},{"name":"Magnum"},{"name":"Nitro"},{"name":"RAM"},{"name":"Stealth"},{"name":"Viper"}]},
    {"brand":"Chrysler","models":[{"name":"300 C"},{"name":"300 C Touring"},{"name":"300 M"},{"name":"Crossfire"},{"name":"Grand Voyager"},{"name":"LHS"},{"name":"Neon"},{"name":"Pacifica"},{"name":"Plymouth"},{"name":"PT Cruiser"},{"name":"Sebring"},{"name":"Sebring Convertible"},{"name":"Stratus"},{"name":"Stratus Cabrio"},{"name":"Town & Country"},{"name":"Voyager"}]},
    {"brand":"Ford","models":[{"name":"Aerostar"},{"name":"B-Max"},{"name":"C-Max"},{"name":"Cortina"},{"name":"Cougar"},{"name":"Edge"},{"name":"Escort"},{"name":"Escort Cabrio"},{"name":"Escort kombi"},{"name":"Explorer"},{"name":"F-150"},{"name":"F-250"},{"name":"Fiesta"},{"name":"Focus"},{"name":"Focus C-Max"},{"name":"Focus CC"},{"name":"Focus kombi"},{"name":"Fusion"},{"name":"Galaxy"},{"name":"Grand C-Max"},{"name":"Ka"},{"name":"Kuga"},{"name":"Maverick"},{"name":"Mondeo"},{"name":"Mondeo Combi"},{"name":"Mustang"},{"name":"Orion"},{"name":"Puma"},{"name":"Ranger"},{"name":"S-Max"},{"name":"Sierra"},{"name":"Street Ka"},{"name":"Tourneo Connect"},{"name":"Tourneo Custom"},{"name":"Transit"},{"name":"Transit"},{"name":"Transit Bus"},{"name":"Transit Connect LWB"},{"name":"Transit Courier"},{"name":"Transit Custom"},{"name":"Transit kombi"},{"name":"Transit Tourneo"},{"name":"Transit Valnik"},{"name":"Transit Van"},{"name":"Transit Van 350"},{"name":"Windstar"}]},
    {"brand":"Hummer","models":[{"name":"H2"},{"name":"H3"}]},
    {"brand":"Hyundai","models":[{"name":"Accent"},{"name":"Atos"},{"name":"Atos Prime"},{"name":"Coupé"},{"name":"Elantra"},{"name":"Galloper"},{"name":"Genesis"},{"name":"Getz"},{"name":"Grandeur"},{"name":"H 350"},{"name":"H1"},{"name":"H1 Bus"},{"name":"H1 Van"},{"name":"H200"},{"name":"i10"},{"name":"i20"},{"name":"i30"},{"name":"i30 CW"},{"name":"i40"},{"name":"i40 CW"},{"name":"ix20"},{"name":"ix35"},{"name":"ix55"},{"name":"Lantra"},{"name":"Matrix"},{"name":"Santa Fe"},{"name":"Sonata"},{"name":"Terracan"},{"name":"Trajet"},{"name":"Tucson"},{"name":"Veloster"}]},
    {"brand":"Infiniti","models":[{"name":"EX"},{"name":"FX"},{"name":"G"},{"name":"G Coupé"},{"name":"M"},{"name":"Q"},{"name":"QX"}]},
    {"brand":"Jaguar","models":[{"name":"Daimler"},{"name":"F-Pace"},{"name":"F-Type"},{"name":"S-Type"},{"name":"Sovereign"},{"name":"X-Type"},{"name":"X-type Estate"},{"name":"XE"},{"name":"XF"},{"name":"XJ"},{"name":"XJ12"},{"name":"XJ6"},{"name":"XJ8"},{"name":"XJ8"},{"name":"XJR"},{"name":"XK"},{"name":"XK8 Convertible"},{"name":"XKR"},{"name":"XKR Convertible"}]},
    {"brand":"Jeep","models":[{"name":"Cherokee"},{"name":"Commander"},{"name":"Compass"},{"name":"Grand Cherokee"},{"name":"Patriot"},{"name":"Renegade"},{"name":"Wrangler"}]},
    {"brand":"Nissan","models":[{"name":"100 NX"},{"name":"200 SX"},{"name":"350 Z"},{"name":"350 Z Roadster"},{"name":"370 Z"},{"name":"Almera"},{"name":"Almera Tino"},{"name":"Cabstar E - T"},{"name":"Cabstar TL2 Valnik"},{"name":"e-NV200"},{"name":"GT-R"},{"name":"Insterstar"},{"name":"Juke"},{"name":"King Cab"},{"name":"Leaf"},{"name":"Maxima"},{"name":"Maxima QX"},{"name":"Micra"},{"name":"Murano"},{"name":"Navara"},{"name":"Note"},{"name":"NP300 Pickup"},{"name":"NV200"},{"name":"NV400"},{"name":"Pathfinder"},{"name":"Patrol"},{"name":"Patrol GR"},{"name":"Pickup"},{"name":"Pixo"},{"name":"Primastar"},{"name":"Primastar Combi"},{"name":"Primera"},{"name":"Primera Combi"},{"name":"Pulsar"},{"name":"Qashqai"},{"name":"Serena"},{"name":"Sunny"},{"name":"Terrano"},{"name":"Tiida"},{"name":"Trade"},{"name":"Vanette Cargo"},{"name":"X-Trail"}]},
    {"brand":"Volvo","models":[{"name":"240"},{"name":"340"},{"name":"360"},{"name":"460"},{"name":"850"},{"name":"850 kombi"},{"name":"C30"},{"name":"C70"},{"name":"C70 Cabrio"},{"name":"C70 Coupé"},{"name":"S40"},{"name":"S60"},{"name":"S70"},{"name":"S80"},{"name":"S90"},{"name":"V40"},{"name":"V50"},{"name":"V60"},{"name":"V70"},{"name":"V90"},{"name":"XC60"},{"name":"XC70"},{"name":"XC90"}]},
    {"brand":"Daewoo","models":[{"name":"Espero"},{"name":"Kalos"},{"name":"Lacetti"},{"name":"Lanos"},{"name":"Leganza"},{"name":"Lublin"},{"name":"Matiz"},{"name":"Nexia"},{"name":"Nubira"},{"name":"Nubira kombi"},{"name":"Racer"},{"name":"Tacuma"},{"name":"Tico"}]},
    {"brand":"Fiat","models":[{"name":"1100"},{"name":"126"},{"name":"500"},{"name":"500L"},{"name":"500X"},{"name":"850"},{"name":"Barchetta"},{"name":"Brava"},{"name":"Cinquecento"},{"name":"Coupé"},{"name":"Croma"},{"name":"Doblo"},{"name":"Doblo Cargo"},{"name":"Doblo Cargo Combi"},{"name":"Ducato"},{"name":"Ducato Van"},{"name":"Ducato Kombi"},{"name":"Ducato Podvozok"},{"name":"Florino"},{"name":"Florino Combi"},{"name":"Freemont"},{"name":"Grande Punto"},{"name":"Idea"},{"name":"Linea"},{"name":"Marea"},{"name":"Marea Weekend"},{"name":"Multipla"},{"name":"Palio Weekend"},{"name":"Panda"},{"name":"Panda Van"},{"name":"Punto"},{"name":"Punto Cabriolet"},{"name":"Punto Evo"},{"name":"Punto Van"},{"name":"Qubo"},{"name":"Scudo"},{"name":"Scudo Van"},{"name":"Scudo Kombi"},{"name":"Sedici"},{"name":"Seicento"},{"name":"Stilo"},{"name":"Stilo Multiwagon"},{"name":"Strada"},{"name":"Talento"},{"name":"Tipo"},{"name":"Ulysse"},{"name":"Uno"},{"name":"X1/9"}]},
    {"brand":"MINI","models":[{"name":"Cooper"},{"name":"Cooper Cabrio"},{"name":"Cooper Clubman"},{"name":"Cooper D"},{"name":"Cooper D Clubman"},{"name":"Cooper S"},{"name":"Cooper S Cabrio"},{"name":"Cooper S Clubman"},{"name":"Countryman"},{"name":"Mini One"},{"name":"One D"}]},
    {"brand":"Rover","models":[{"name":"200"},{"name":"214"},{"name":"218"},{"name":"25"},{"name":"400"},{"name":"414"},{"name":"416"},{"name":"620"},{"name":"75"}]},
    {"brand":"Smart","models":[{"name":"Cabrio"},{"name":"City-Coupé"},{"name":"Compact Pulse"},{"name":"Forfour"},{"name":"Fortwo cabrio"},{"name":"Fortwo coupé"},{"name":"Roadster"}]}
    ];


  constructor(
    protected carsService: CarsService
  ) { }

  public ngOnInit(): void {
    window.scrollTo(0, 0);
    this.newCarForm = new FormGroup({
      brand: new FormControl('', [Validators.required]),
      model: new FormControl('', [Validators.required]),
      'first_registration': new FormControl('', [Validators.required]),
      'color': new FormControl('', [Validators.required]),
      'km': new FormControl('', [Validators.required]),
      'price': new FormControl('', [Validators.required]),
      'transmission': new FormControl('', [Validators.required]),
      'doors': new FormControl('', [Validators.required]),
      'description': new FormControl('', [Validators.required]),
      'combustibil': new FormControl('', [Validators.required])
    });

    this.types = [
      {label: 'Benzina', value: 'gas', icon: 'fa fa-fw fa-cc-paypal'},
      {label: 'Diesel', value: 'diesel', icon: 'fa fa-fw fa-cc-visa'}
    ];

    for(let i = 1998; i <= 2018; i++) {
      this.years.push({label: i.toString(), value: i.toString(), icon: 'fa fa-fw fa-cc-paypal'});
    }

    this.transmissions = [
      {label: 'Manuala', value: 'manual', icon: 'fa fa-fw fa-cc-paypal'},
      {label: 'Automatata', value: 'automatic', icon: 'fa fa-fw fa-cc-paypal'}
    ];

    this.colors = [
      {label: 'Rosu', value: 'red', icon: 'fa fa-fw fa-cc-paypal'},
      {label: 'Albastru', value: 'blue', icon: 'fa fa-fw fa-cc-paypal'},
      {label: 'Galben', value: 'yellow', icon: 'fa fa-fw fa-cc-paypal'},
      {label: 'Negru', value: 'black', icon: 'fa fa-fw fa-cc-paypal'},
      {label: 'Alb', value: 'white', icon: 'fa fa-fw fa-cc-paypal'},
      {label: 'Verde', value: 'green', icon: 'fa fa-fw fa-cc-paypal'},
      {label: 'Gri', value: 'grey', icon: 'fa fa-fw fa-cc-paypal'},
      {label: 'Roz', value: 'pink', icon: 'fa fa-fw fa-cc-paypal'},
    ];

  }


  get brand() { return this.newCarForm.get('brand'); }
  get model() { return this.newCarForm.get('model'); }
  get first_registration() { return this.newCarForm.get('first_registration').value; }
  get color() { return this.newCarForm.get('color').value; }
  get km() { return this.newCarForm.get('km'); }
  get price() { return this.newCarForm.get('price'); }
  get transmission() { return this.newCarForm.get('transmission'); }
  get doors() { return this.newCarForm.get('doors'); }
  get description() { return this.newCarForm.get('description'); }
  get combustibil() { return this.newCarForm.get('combustibil'); }

  async addNewCar() {
    const car = new Car({
        'brand': this.brand.value.brand,
        'model': this.model.value.name,
        'firstRegistration': new Date(this.first_registration.value.toString()),
        'color': this.color.value,
        'numberOfKilometers': this.km.value,
        'priceEuro': this.price.value,
        'numberOfDoors': this.doors.value,
        'transmissionType': this.transmission.value,
        'description': this.description.value,
        'fuelType': this.combustibil.value
      }
    );
    await car.save();
    this.id = car.id;
    // this.carsService.addCar({
    //   'brand': this.brand.value.brand,
    //   'model': this.model.value.name,
    //   'first-registration': this.first_registration.value,
    //   'color': this.color.value,
    //   'number-of-kilometers': this.km.value,
    //   'price-euro': this.price.value,
    //   'number-of-doors': this.doors.value,
    //   'transmission-type': this.transmission.value,
    //   'description': this.description.value,
    //   'combustibil': this.combustibil.value
    // }).subscribe((response:any) => {
    //   console.log(response);
    // });

  }

  onUpload(event) {
    for(let file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.msgs = [];
    this.msgs.push({severity: 'info', summary: 'File Uploaded', detail: ''});
  }

}
