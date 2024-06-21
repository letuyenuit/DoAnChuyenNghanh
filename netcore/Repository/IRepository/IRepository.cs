using System.Linq.Expressions;

namespace _net.Repository.IRepository
{
    public interface IRepository<T> where T : class
    {
        public void Add(T entity);
        public IEnumerable<T> GetAll(Expression<Func<T, bool>> filter, string? includeProperties = null);
        public T Get(Expression<Func<T, bool>> filter, string? includeProperties = null);
        public void Remove(T entity);
        public void RemoveRange(IEnumerable<T> entities);
    }
}