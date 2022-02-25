package beans.web3;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;
import java.util.List;

public class DataBaseWorker {
    private static final EntityManagerFactory emf = Persistence.createEntityManagerFactory("postgresql");

    public List<Point> selectPoints(String ownerSessionId){
        List<Point> pointList;
        EntityManager em = emf.createEntityManager();
        Query q = em.createQuery("select point from Point point where owner = :ownerId");
        q.setParameter("ownerId", ownerSessionId);
        pointList = q.getResultList();
        return pointList;
    }

    public void setPoint(Point point){
        EntityManager em = emf.createEntityManager();
        em.getTransaction().begin();
        em.persist(point);
        em.getTransaction().commit();
    }

    public void clearPoints(){
        EntityManager em = emf.createEntityManager();
        em.getTransaction().begin();
        em.createQuery("delete from Point ").executeUpdate();
        em.getTransaction().commit();
    }
}
