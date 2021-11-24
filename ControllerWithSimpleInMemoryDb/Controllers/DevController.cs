using ControllerWithSimpleInMemoryDb.InMemoryDb;
using ControllerWithSimpleInMemoryDb.Models;

using Microsoft.AspNetCore.Mvc;

namespace ControllerWithSimpleInMemoryDb.Controllers
{
    public class DevController : Controller
    {
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
        public IActionResult Create(long id, string firstName, string lastName)
        {
            DevDb.Devs.Add(id,new Dev { Id = id, FirstName = firstName ?? string.Empty, LastName = lastName ?? string.Empty});

            return RedirectToAction("Devs");
        }

        [HttpPost]
        public IActionResult Edit(long id, string firstName)
        {
            DevDb.Devs[id].FirstName = firstName;

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
