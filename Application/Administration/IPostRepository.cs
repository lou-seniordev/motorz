using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;

namespace Application.Administration
{
    public interface IPostRepository
    {
        Task<IEnumerable<Activity>> GetUserActivities(string username);
        Task<Activity> GetUserActivity(string id);

        Task<IEnumerable<Motofy>> GetUserMotofies(string username);
        Task<Motofy> GetUserMotofy(string id);

        Task<IEnumerable<Forumpost>> GetUserForumposts(string username);
        Task<Forumpost> GetUserForumpost(string id);

        Task<IEnumerable<Mechanic>> GetUserMechanics(string username);
        Task<Mechanic> GetUserMechanic(string id);

        Task<IEnumerable<Product>> GetUserProducts(string username);
        Task<Product> GetUserProduct(string id);
    }
}