# utils.py
import pandas as pd
import json
from datetime import datetime

ALLOWED_EXTENSIONS = {'xlsx', 'xls'}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def process_excel_file(file, manager_id):
    """Process uploaded Excel file and create employee records"""
    from app import db
    from models import Employee
    try:
        # Read Excel file
        df = pd.read_excel(file)

        # Expected columns mapping
        column_mapping = {
            'Employee ID': 'employee_id',
            'Name': 'name',
            'Email': 'email',
            'Designation': 'designation',
            'Department': 'department',
            'Location': 'location',
            'Team': 'team',
            'Skills': 'skills',
            'Employment Type': 'employment_type',
            'Billable Status': 'billable_status',
            'Join Date': 'join_date',
            'Experience Years': 'experience_years',
            'Manager ID': 'manager_employee_id'
        }

        success_count = 0

        for index, row in df.iterrows():
            try:
                # Check if employee already exists
                existing_employee = Employee.query.filter_by(
                    employee_id=str(row.get('Employee ID', ''))
                ).first()

                if existing_employee:
                    continue

                # Create new employee
                employee = Employee()

                # Map basic fields
                employee.employee_id = str(row.get('Employee ID', ''))
                employee.name = str(row.get('Name', ''))
                employee.email = str(row.get('Email', ''))
                employee.designation = str(row.get('Designation', ''))
                employee.department = str(row.get('Department', ''))
                employee.location = str(row.get('Location', ''))
                employee.team = str(row.get('Team', ''))
                employee.skills = str(row.get('Skills', ''))
                employee.employment_type = str(row.get('Employment Type', ''))
                employee.billable_status = str(row.get('Billable Status', ''))

                # Handle dates and numbers
                if pd.notna(row.get('Join Date')):
                    if isinstance(row['Join Date'], str):
                        employee.join_date = datetime.strptime(row['Join Date'], '%Y-%m-%d').date()
                    else:
                        employee.join_date = row['Join Date'].date()

                if pd.notna(row.get('Experience Years')):
                    employee.experience_years = float(row['Experience Years'])

                # Set manager - for now, set to importing manager
                employee.manager_id = manager_id

                # Set default password
                employee.set_password('password123')

                # Determine if this person is a manager based on hierarchy data
                # This would need to be enhanced based on actual Excel structure
                employee.is_manager = False

                db.session.add(employee)
                success_count += 1

            except Exception as e:
                print(f"Error processing row {index}: {str(e)}")
                continue

        db.session.commit()

        return {
            'success': True,
            'count': success_count,
            'error': None
        }

    except Exception as e:
        db.session.rollback()
        return {
            'success': False,
            'count': 0,
            'error': str(e)
        }

def get_dashboard_analytics(employees):
    """Generate analytics data for dashboard charts"""
    if not employees:
        return {
            'skills': {},
            'employment_type': {},
            'billable_status': {},
            'location': {},
            'team': {},
            'total_employees': 0
        }

    analytics = {
        'skills': {},
        'employment_type': {},
        'billable_status': {},
        'location': {},
        'team': {},
        'total_employees': len(employees)
    }

    for employee in employees:
        # Employment type analytics
        emp_type = employee.employment_type or 'Unknown'
        analytics['employment_type'][emp_type] = analytics['employment_type'].get(emp_type, 0) + 1

        # Billable status analytics
        billable = employee.billable_status or 'Unknown'
        analytics['billable_status'][billable] = analytics['billable_status'].get(billable, 0) + 1

        # Location analytics
        location = employee.location or 'Unknown'
        analytics['location'][location] = analytics['location'].get(location, 0) + 1

        # Team analytics
        team = employee.team or 'Unknown'
        analytics['team'][team] = analytics['team'].get(team, 0) + 1

        # Skills analytics (assuming skills are comma-separated)
        if employee.skills:
            skills_list = [skill.strip() for skill in employee.skills.split(',')]
            for skill in skills_list:
                if skill:
                    analytics['skills'][skill] = analytics['skills'].get(skill, 0) + 1

    return analytics

def create_sample_data():
    """Create sample data for testing - only use if no data exists"""
    from models import Employee
    from app import db

    if Employee.query.first():
        return  # Data already exists

    # Create top-level manager
    top_manager = Employee(
        employee_id='EMP001',
        name='Sooraj Kumar',
        email='sooraj@company.com',
        designation='VP Engineering',
        department='Engineering',
        location='Bangalore',
        team='UFS',
        employment_type='Permanent',
        billable_status='Non-billable',
        is_manager=True,
        manager_id=None
    )
    top_manager.set_password('password123')
    db.session.add(top_manager)
    db.session.commit()

    # Create line managers
    managers = [
        {
            'employee_id': 'EMP002',
            'name': 'Anuja Sharma',
            'email': 'anuja@company.com',
            'designation': 'Engineering Manager',
            'team': 'UFS'
        },
        {
            'employee_id': 'EMP003',
            'name': 'Asha Patel',
            'email': 'asha@company.com',
            'designation': 'Tech Lead',
            'team': 'RG'
        },
        {
            'employee_id': 'EMP004',
            'name': 'Vinod Singh',
            'email': 'vinod@company.com',
            'designation': 'Senior Manager',
            'team': 'UFS'
        }
    ]

    for mgr_data in managers:
        manager = Employee(
            employee_id=mgr_data['employee_id'],
            name=mgr_data['name'],
            email=mgr_data['email'],
            designation=mgr_data['designation'],
            department='Engineering',
            location='Bangalore',
            team=mgr_data['team'],
            employment_type='Permanent',
            billable_status='Billable',
            is_manager=True,
            manager_id=top_manager.id
        )
        manager.set_password('password123')
        db.session.add(manager)

    db.session.commit()