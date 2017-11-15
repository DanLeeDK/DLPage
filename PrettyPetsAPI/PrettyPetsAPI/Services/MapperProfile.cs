using AutoMapper;
using PrettyPetsAPI.Models;
using PrettyPetsAPI.Viewmodels;


namespace PrettyPetsAPI.Services
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<RegistrationViewModel, AppUser>();
        }
    }
}