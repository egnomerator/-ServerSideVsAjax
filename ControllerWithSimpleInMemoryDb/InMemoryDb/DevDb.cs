using ControllerWithSimpleInMemoryDb.Models;
using System.Collections.Generic;

namespace ControllerWithSimpleInMemoryDb.InMemoryDb
{
    public class DevDb
    {
        public static readonly Dictionary<long, Dev> Devs = new Dictionary<long, Dev> 
        { 
            { 1, new Dev { Id = 1, Name = "Charlie" } },
            { 2, new Dev { Id = 2, Name = "Mac" } },
            { 3, new Dev { Id = 3, Name = "Dennis" } },
            { 4, new Dev { Id = 4, Name = "Frank" } },
            { 5, new Dev { Id = 5, Name = "Dee" } }
        };
    }
}
