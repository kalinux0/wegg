<?php
namespace App\Repository;

use App\Entity\Users;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class VoteRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry) {
        parent::__construct($registry, Users::class);
    }
    public function vote(int $id): array
    {
        $conn = $this->getEntityManager()->getConnection();

        $sql = 'UPDATE users SET vote = vote+1 WHERE id = :id';

        $stmt = $conn->prepare($sql);

        $resultSet = $stmt->executeQuery(['id' => $id]);
        
        return $resultSet->fetchAllAssociative();
    }
}