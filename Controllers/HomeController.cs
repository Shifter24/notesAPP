using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using NotesAPP.Models;
using System.Data.SqlClient;

namespace NotesAPP.Controllers
{
    public class HomeController : Controller
    {
    
        private readonly IConfiguration _configuration;
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger, IConfiguration Configuration)
        {
            _logger = logger;
            _configuration = Configuration;
        }

        private SqlConnection? con;

        private void Connection() 
        {
            string constr = _configuration.GetConnectionString("noteConn");

            con = new SqlConnection(constr);
        }

        //HTTP GET Index
        public IActionResult Index()
        {
            IEnumerable<Note> notesToShow = GetNotes();

            return View(notesToShow);
        }

        public IActionResult Pinned()
        {
            IEnumerable<Note> notesToShow = GetPinned();

            return View(notesToShow);
        }

        public IActionResult Error() 
        {
            return View("~/Views/Shared/Error.cshtml");
        }

        private List<Note> GetNotes() //It takes notes from DB and save it to a List
        {
            Connection();

            //Stores notes from DB
            List<Note> notes = new List<Note>();
           
            using (con) 
            {
                string query = "SELECT * FROM Note ORDER BY created_at DESC";

                using (SqlCommand cmd = new SqlCommand(query)) 
                {
                    cmd.Connection = con;
                    con.Open();

                    using (SqlDataReader sdr = cmd.ExecuteReader()) 
                    {
                        while (sdr.Read()) 
                        {
                            notes.Add(new Note() 
                            {
                                Id = Convert.ToInt32(sdr["id"]),
                                Title = Convert.ToString(sdr["title"]),
                                Desc = Convert.ToString(sdr["descr"]), 
                                Created_at = getCreationHour(Convert.ToDateTime(sdr["created_at"])),
                                Pinned = Convert.ToBoolean(sdr["pinned"])
                            });
                        }      
                    }

                    con.Close();
                }

            }

            return notes;
        }//End GetNotes

        private List<Note> GetPinned() //It takes notes from DB and save it to a List
        {
            Connection();

            //Stores notes from DB
            List<Note> notes = new List<Note>();

            using (con)
            {
                string query = "SELECT * FROM Note WHERE pinned = 1 ORDER BY created_at DESC";

                using (SqlCommand cmd = new SqlCommand(query))
                {
                    cmd.Connection = con;
                    con.Open();

                    using (SqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            notes.Add(new Note()
                            {
                                Id = Convert.ToInt32(sdr["id"]),
                                Title = Convert.ToString(sdr["title"]),
                                Desc = Convert.ToString(sdr["descr"]),
                                Created_at = getCreationHour(Convert.ToDateTime(sdr["created_at"])),
                                Pinned = Convert.ToBoolean(sdr["pinned"])
                            });
                        }
                    }

                    con.Close();
                }

            }

            return notes;
        }//End GetNotes

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult CreateNote(Note note) 
        {
            Connection();

            note.Title = checkTitle(note.Title);
            note.Desc = checkDescr(note.Desc);

            using (con) 
            {
                SqlCommand cmd = new SqlCommand("CreateNote", con);

                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@title", note.Title);
                cmd.Parameters.AddWithValue("@descr", note.Desc);
                cmd.Parameters.AddWithValue("@pinned", note.Pinned);

                con.Open();

                int i = cmd.ExecuteNonQuery();

                con.Close();

                return (i >= 1) ? RedirectToAction("Index") : RedirectToAction("Error");
            }

        }//End CreateNote

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult EditNote(Note note) 
        {
            Connection();

            note.Title = checkTitle(note.Title);
            note.Desc = checkDescr(note.Desc);

            using (con) 
            {
                SqlCommand cmd = new SqlCommand("EditNote", con);

                cmd.CommandType= System.Data.CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@id", note.Id);
                cmd.Parameters.AddWithValue("@title", note.Title);
                cmd.Parameters.AddWithValue("@descr", note.Desc);
                cmd.Parameters.AddWithValue("@pinned", note.Pinned);

                con.Open();

                int i = cmd.ExecuteNonQuery();

                con.Close();

                return (i >= 1) ? RedirectToAction("Index") : RedirectToAction("Error");
            }
        }//End EditNote

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult DeleteNote(Note note) 
        {
            Connection();

            using (con) 
            {
                SqlCommand cmd = new SqlCommand("DeleteNote", con);

                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@id", note.Id);

                con.Open();

                int i = cmd.ExecuteNonQuery();

                con.Close();

                return (i >= 1) ? RedirectToAction("Index") : RedirectToAction("Error");
            }
            
        }//End DeleteNote
        
        //To customize hour in note preview
        private string getCreationHour(DateTime hourFromDB)
        {//
            return hourFromDB.ToString("MMM d, HH:mm");
        }

        private string checkTitle(string title) 
        {
            if (title == null) return "";

            return title;
        }

        private string checkDescr(string descr) 
        {
            if (descr == null) return "";

            return descr;
        }
    }
}
