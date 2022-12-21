using Microsoft.EntityFrameworkCore;
using System.Reflection;
using System;
using CustomPage.Database.DbModels;

namespace CustomPage.Database
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.HasDefaultSchema("dbo");
           
            builder.ApplyConfigurationsFromAssembly(Assembly.GetAssembly(typeof(ApplicationDbContext)) ??
                                                    throw new
                                                        InvalidOperationException(
                                                            $"Could not apply EF configurations because no assembly was found for type {nameof(ApplicationDbContext)}."));
        }

        public DbSet<ServerSetting> ServerSettings { get; set; }
    }
}
