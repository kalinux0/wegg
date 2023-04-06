<?php
namespace App\Repository;

use App\Entity\Users;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class UsersRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry) {
        parent::__construct($registry, Users::class);
    }
    public function getAll(int $start, int $limit): array
    {
        $conn = $this->getEntityManager()->getConnection();

        $sql = 'SELECT count(id) FROM users a ORDER BY a.vote DESC';
        
        $stmt = $conn->prepare($sql);

        $count = $stmt->executeQuery()->fetchOne();

        $sql = 'SELECT * FROM users a ORDER BY a.vote DESC LIMIT '.$start.','.$limit;

        $stmt = $conn->prepare($sql);

        $resultSet = $stmt->executeQuery();

        $products = [];
        $products['data'] = $resultSet->fetchAllAssociative();
        $products['count'] = $count;

        return $products;
    }
}