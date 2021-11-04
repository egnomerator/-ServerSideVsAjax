using ControllerWithSimpleInMemoryDb.InMemoryDb;
using ControllerWithSimpleInMemoryDb.Models;

using Microsoft.AspNetCore.Mvc;

namespace ControllerWithSimpleInMemoryDb.Controllers
{
    public class DevController : Controller
    {
        //public static readonly Dictionary<long, Dev> DevDb = new Dictionary<long, Dev> { { 1, new Dev { Id = 1, Name = "Charlie" } } };

        public DevController()
        {
            //DevDb = new Dictionary<long, Dev> { { 1, new Dev { Id = 1, Name = "Mac" } } };
            var p = "pause";
        }

        public IActionResult Devs()
        {
            return View("Index", DevDb.Devs);
        }

        public IActionResult Dev(long id)
        {
            var dev = DevDb.Devs[id];

            return View("Dev", dev);
        }

        [HttpPost]
        public IActionResult Create(long id, string name)
        {
            DevDb.Devs.Add(id,new Dev { Id = id, Name = name});

            return RedirectToAction("Devs");
        }

        [HttpPost]
        public IActionResult Edit(long id, string name)
        {
            DevDb.Devs[id].Name = name;

            return RedirectToAction("Devs");
        }

        [HttpPost]
        public IActionResult Delete(long id)
        {
            DevDb.Devs.Remove(id);

            return RedirectToAction("Devs");
        }
    }
}
