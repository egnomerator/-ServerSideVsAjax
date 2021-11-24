using ControllerWithSimpleInMemoryDb.Models;
using System.Collections.Generic;

namespace ControllerWithSimpleInMemoryDb.InMemoryDb
{
    public class DevDb
    {
        public static readonly Dictionary<long, Dev> Devs = new Dictionary<long, Dev> { 
            { 1, new Dev { Id = 1, FirstName = "Charlie", LastName = "Day" } },
            { 2, new Dev { Id = 2, FirstName = "Mac", LastName = "McDonald" } },
            { 3, new Dev { Id = 3, FirstName = "Dennis", LastName = "Reynolds" } },
            { 4, new Dev { Id = 4, FirstName = "Frank", LastName = "Reynolds" } },
            { 5, new Dev { Id = 5, FirstName = "Dee", LastName = "Reynolds" } },
        };
    }
}
