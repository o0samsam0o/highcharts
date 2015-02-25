<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1" import="java.sql.*, java.util.*, org.json.JSONObject, org.json.JSONArray,java.text.SimpleDateFormat"%>
<%
	
	
	 
	 	DataProvider dataProvider = new DataProvider();
		Connection con = dataProvider.getConnection();
		String id = request.getParameter("id");
		//String id = "5002000";
		
		java.sql.Date lastAssessmentDate = null;
		
		String dateValue = request.getParameter("dateValue");
		//System.out.println("dateValue "+dateValue);
		if(dateValue!=null){
			//System.out.println("dateValue is not null"+dateValue);
			SimpleDateFormat format = new SimpleDateFormat("dd.MM.yyyy");
	        java.util.Date parsed = format.parse(dateValue);
	        lastAssessmentDate = new java.sql.Date(parsed.getTime());
	       // System.out.println("lastAssessmentDate: "+lastAssessmentDate);
		}else{
			//System.out.println("dateValue is null");
			Calendar calendar = Calendar.getInstance();

		    // Move calendar to tomorrow
		    calendar.add(Calendar.MONTH, -1);

		    // Get current date of calendar which point to the yesterday now
		    java.util.Date lastMonthdate = calendar.getTime();
			
			java.util.Date utilDate = new java.util.Date(); 
			 lastAssessmentDate = new java.sql.Date(lastMonthdate.getTime());
		}
				
		
		JSONArray jsonArray = new JSONArray();
		//System.out.println("lastAssessmentDate before: "+lastAssessmentDate);
		int projectID = Integer.parseInt(id);		
		jsonArray = dataProvider.getJSONData1(con, projectID, lastAssessmentDate);	
		
		try {
			con.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 

	  	// Serialize JSON object	  	
	  	out.print(jsonArray);
		out.flush();
	
		
    %>