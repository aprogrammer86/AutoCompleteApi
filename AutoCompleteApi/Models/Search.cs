using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CompareIt.Endpoints.WebUi.Models
{
    public class Search
    {
        public string Id { get; set; }
        public int Index { get; set; }
        public string UserText { get; set; }
        public List<string> ResultCandidates { get; set; }
    }
}
