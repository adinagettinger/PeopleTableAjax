using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PeopleTableDataBase;

namespace PeopleTableAjax.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            DataBaseManger db = new DataBaseManger(Properties.Settings.Default.constr);
            IEnumerable<person> people = db.GetAllPeople();
            return View(people);
        }

        [HttpPost]
        public void AddPerson(person p)
        {
            DataBaseManger db = new DataBaseManger(Properties.Settings.Default.constr);
            db.AddPerson(p);
            
        }

        [HttpPost]
        public ActionResult GetAllPeople()
        {
            DataBaseManger db = new DataBaseManger(Properties.Settings.Default.constr);
            var people = db.GetAllPeople();
            return Json(people);
        }

        [HttpPost]
        public void DeletePerson(int id)
        {
            DataBaseManger db = new DataBaseManger(Properties.Settings.Default.constr);
            db.DeletePerson(id);
            
        }
        
        [HttpPost]
        public void EditPerson(person person)
        {
            DataBaseManger db = new DataBaseManger(Properties.Settings.Default.constr);
            db.EditPerson(person);

        }

        [HttpPost]
        public ActionResult GetPerson(int id)
        {
            DataBaseManger db = new DataBaseManger(Properties.Settings.Default.constr);
            person person = db.GetPerson(id);
            return Json(person);
        }
        
    }
}