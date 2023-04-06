<?php
namespace App\Repository;

use App\Entity\UserInfos;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class UserInfosRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry) {
        parent::__construct($registry, UserInfos::class);
    }
    public function getById(int $id): array
    {
        $conn = $this->getEntityManager()->getConnection();

        $sql = 'SELECT *
            FROM user_infos a
            WHERE id = :id';

        $stmt = $conn->prepare($sql);

        $resultSet = $stmt->executeQuery(['id' => $id]);

        return $resultSet->fetchAllAssociative();
    }
}