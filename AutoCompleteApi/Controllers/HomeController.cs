using AutoCompleteApi.Infrastructures;
using AutoCompleteApi.Models;
using CompareIt.Endpoints.WebUi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace AutoCompleteApi.Controllers
{
    public class HomeController : Controller
    {
        private CityRepository _cityRepository;
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger, CityRepository cityRepository)
        {
            _cityRepository = cityRepository;
            _logger = logger;
        }

        public IActionResult Index()
        {
            var search = new Search
            {
                UserText = "",
                ResultCandidates = null
            };
            return View(search);
        }
        [HttpPost]
        public Search ResultCandidates([FromBody]Search search)
        {
            search.ResultCandidates = null;

            if(!string.IsNullOrEmpty(search.UserText))
                search.ResultCandidates = _cityRepository.FindAll(search.UserText);

            return search;
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
