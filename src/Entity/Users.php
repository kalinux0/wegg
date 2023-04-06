<?php
namespace App\Entity;

use App\Repository\UsersRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UsersRepository::class)]
class Users 
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    private ?string $surname = null;

    #[ORM\Column(length: 255)]
    private ?string $image = null;

    #[ORM\Column(length: 255)]
    private ?string $title = null;

    #[ORM\Column]
    private ?int $vote = null;

    public function getId(): ?int
    {
        return $this->id;
    }
    public function getSurname(): ?string
    {
        return $this->surname;
    }
    public function getTitle(): ?string
    {
        return $this->title;
    }
    public function getVote(): ?int
    {
        return $this->vote;
    }

}