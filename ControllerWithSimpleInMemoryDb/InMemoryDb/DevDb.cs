using ControllerWithSimpleInMemoryDb.Models;
using System.Collections.Generic;

namespace ControllerWithSimpleInMemoryDb.InMemoryDb
{
    public class DevDb
    {
        public static readonly Dictionary<long, Dev> Devs = new Dictionary<long, Dev> { { 1, new Dev { Id = 1, Name = "Charlie" } } };
    }
}
