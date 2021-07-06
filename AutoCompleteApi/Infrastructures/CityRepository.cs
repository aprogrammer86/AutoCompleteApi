using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutoCompleteApi.Infrastructures
{
    public class CityRepository
    {
        private readonly List<string> _cities = new List<string> { "Tehran", "Mashhad", "Isfahan", "Karaj", "Shiraz",
            "Tabriz", "Qom", "Ahvaz", "Kermanshah", "Urmia", "Rasht", "Zahedan", "Hamadan", "Kerman", "Yazd", "Ardabil",
            "Bandar Abbas", "Arak", "Eslamshahr", "Qazvin", "Zanjan", "Khorramabad", "Sanandaj", "Malard", "Qods", "Kashan",
            "Gorgan", "Golestan", "Sari", "Shahriar", "Dezful", "Khomeyni Shahr", "Borujerd", "Nishapur", "Sabzevar", "Najafabad",
            "Amol", "Babol", "Varamin", "Abadan", "Pakdasht", "Khoy", "Saveh", "Bojnord", "Qaem Shahr", "Bushehr", "Qarchak",
            "Sirjan", "Birjand", "Ilam", "Bukan", "Maragheh", "Malayer", "Shahr-e Kord", "Bandar-e Mahshahr", "Semnan",
            "Rafsanjan", "Mahabad", "Gonbad-e Kavus", "Shahin Shahr", "Shahrud", "Saqqez", "Marvdasht", "Zabol",
            "Torbat-e Heydarieh", "Khorramshahr", "Andimeshk", "Marand", "Shahreza", "Miandoab", "Izeh", "Bandar-e Anzali",
            "Jahrom", "Jiroft", "Marivan", "Kamal Shahr", "Yasuj", "Nazarabad", "Behbahan", "Bam", "Fasa", "Quchan",
            "Masjed Soleyman", "Mohammadshahr", "Dorud", "Borazjan", "Fardis", "Nasimshahr", "Andisheh", "Iranshahr",
            "Baneh", "Chabahar", "Robat Karim", "Kashmar", "Shushtar", "Lahijan", "Ahar", "Torbat-e Jam"};


        public List<string> FindAll(string text)
        {
            var result = _cities.Where(c => c.StartsWith(text, StringComparison.InvariantCultureIgnoreCase)).ToList();
            return result;
        }
    }
}
