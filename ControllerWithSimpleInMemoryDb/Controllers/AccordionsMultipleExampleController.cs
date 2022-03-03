using Microsoft.AspNetCore.Mvc;

namespace ControllerWithSimpleInMemoryDb.Controllers
{
    public class AccordionsMultipleExampleController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
