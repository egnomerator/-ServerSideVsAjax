using ControllerWithSimpleInMemoryDb.InMemoryDb;
using ControllerWithSimpleInMemoryDb.Models;

using Microsoft.AspNetCore.Mvc;

using System.Linq;

namespace ControllerWithSimpleInMemoryDb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DevsController : ControllerBase
    {
        // GET api/devs
        [Route("")]
        public IActionResult Get()
        {
            var devList = DevDb.Devs.Select(kvp => kvp.Value).ToList();

            return Ok(devList);
        }

        // GET api/devs/5
        [Route("{id:long}")]
        [HttpGet]
        public IActionResult Get(long id)
        {
            var dev = DevDb.Devs[id];

            return Ok(dev);
        }

        // POST api/devs FromBody
        [HttpPost]
        public IActionResult Post(Dev dev)
        {
            DevDb.Devs.Add(dev.Id, dev);

            return CreatedAtAction(nameof(Get), new { id = dev.Id });
        }

        // PUT api/devs FromBody
        [HttpPut]
        public IActionResult Put(Dev dev)
        {
            DevDb.Devs[dev.Id].Name = dev.Name;

            return NoContent();
        }

        // DELETE api/devs/5
        [Route("{id:long}")]
        [HttpDelete]
        public IActionResult Delete(long id)
        {
            DevDb.Devs.Remove(id);

            return NoContent();
        }
    }
}
