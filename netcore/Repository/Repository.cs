using System.Linq.Expressions;
using _net.Repository.IRepository;
using DataAccess;
using Microsoft.EntityFrameworkCore;

namespace _net.Repository;
public class Repository<T> : IRepository<T> where T : class
{
    private readonly ApplicationDbContext _db;
    public DbSet<T> dbSet;
    public Repository(ApplicationDbContext db)
    {
        _db = db;
        dbSet = _db.Set<T>();
    }
    public void Add(T entity)
    {
        dbSet.Add(entity);
    }
    public T Get(Expression<Func<T, bool>> filter, string? includeProperties = null)
    {
        IQueryable<T> query = dbSet;
        query = query.Where(filter);
        if (!string.IsNullOrEmpty(includeProperties))
        {
            foreach (var property in includeProperties.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                query = query.Include(property);
            }
        }
        return query.FirstOrDefault();
    }

    public IEnumerable<T> GetAll(Expression<Func<T, bool>> filter, string? includeProperties = null)
    {
        IQueryable<T> query = dbSet;
        query = query.Where(filter);
        if (!string.IsNullOrEmpty(includeProperties))
        {
            foreach (var property in includeProperties.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                query = query.Include(property);
            }
        }
        return query.ToList();
    }

    public void Remove(T entity)
    {
        dbSet.Remove(entity);
    }

    public void RemoveRange(IEnumerable<T> entities)
    {
        dbSet.RemoveRange(entities);
    }
}