﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using PrettyPetsAPI.Models;

namespace PrettyPetsAPI
{
    public class Pet
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100), MinLength(1)]
        public string Name { get; set; }

        [Required]
        [MaxLength(100), MinLength(1)]
        public string Town { get; set; }

        [Required]
        [Range(0, 100, ErrorMessage = "Can only be between 0 .. 100 years")]
        public int Age { get; set; }

        public int PetOwnerId { get; set; }

        public List<Image> Images { get; set; }
    }
}