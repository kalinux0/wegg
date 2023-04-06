<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\UsersRepository;
use App\Repository\UserInfosRepository;
use App\Repository\VoteRepository;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;

class ApiController extends AbstractController
{
    #[Route("/api/users")]
    public function users(Request $request, UsersRepository $usersRepository):Response
    {
        $request_data = json_decode($request->getContent());
        $start = $request_data->start;
        $limit = $request_data->limit;
        $products = $usersRepository->getAll($start,$limit);
        $result = [
            "count"=>$products['count'],
            "result"=>1,
            "start"=>$start,
            "limit"=>$limit,
            "data"=>$products['data']
        ];
        return new Response(json_encode($result));
    }
    
    #[Route("/api/vote/{id}")]
    public function vote(int $id, VoteRepository $voteRepository):Response
    {
        
        $product = $voteRepository->vote($id);

        $result = [
            "result"=>1
        ];

        return new Response(json_encode($result));
    }

    #[Route("/api/user/{id}")]
    public function userInfos(int $id, UserInfosRepository $userInfosRepository):Response
    {
        $product = $userInfosRepository
        ->getById($id);

        $result = [
            "count"=>1,
            "result"=>1,
            "data"=>json_encode($product)
        ];

        return new Response(json_encode($result));
    }
    
}
