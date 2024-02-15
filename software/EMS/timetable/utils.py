from random import shuffle
from random import choice
from .models import Class, Course, Schedule
import pandas as pd
from operator import itemgetter
from math import floor


def split_courses(courses):
    sc_courses = []
    nc_courses = []
    for course in courses:
        if Schedule.objects.filter(course__code=course.code).count() < 1:
            nc_courses.append(course)
        else:
            sc_courses.append(course)

    return (sc_courses, nc_courses)


def split_eed(courses):
    nc_courses = []
    eed = None
    for course in courses:
        if course.code.split(" ")[0] == "EED":
            eed = course
        else:
            nc_courses.append(course)
    return (nc_courses, eed)


def get_next_period(old_period, new_classe):

    if old_period == "AM" and new_classe.level.split(" ")[1] == "I":
        period = "AM"
    elif old_period == "AM" and new_classe.level.split(" ")[1] == "II":
        period = "AM"
    elif old_period == "PM" and new_classe.level.split(" ")[1] == "I":
        period = "AM"
    elif old_period == "PM" and new_classe.level.split(" ")[1] == "II":
        period = "PM"

    return period


def schedule_prev(courses, classe, dates):
    if len(courses) > 0:
        for s in courses:
            sch = Schedule.objects.filter(course__code=s.code)[0]
            item = Schedule.objects.create(
                day=sch.day,
                course=sch.course,
                classe=classe,
                period=sch.period
            )
            item.save()
            if sch.day in dates:
                dates.remove(sch.day)


def get_new_period(classe, course):
    schedules_list = Schedule.objects.filter(course__code=course.code)
    classes = []
    for schedule in schedules_list:
        classes.append(schedule.classe)

    if classe.level.split(" ")[1] == "I":
        period = "AM"
    else:
        period = "PM"

    for cl in classes:
        if cl.level.split(" ")[1] == "I":
            period == "AM"
    if course.exam_type == "CBE":
        period = "AM"

    return period


def schedule_next(courses, classe, dates):
    if len(courses) > 0:
        for nc in courses:
            day = choice(dates)
            period = get_new_period(classe, nc)
            item = Schedule(course=nc, day=day, period=period, classe=classe)
            item.save()
            if day in dates:
                dates.remove(day)


def save_to_csv(obj, dep):
    df = []
    for schedule in obj:
        new_dict = {
            "Course Title": schedule.course.name,
            "Course Code": schedule.course.code,
            "Class": f"{schedule.classe}",
            "Date": schedule.day,
            "Period": schedule.period
        }
        df.append(new_dict)
    schedules_df = pd.DataFrame(
        df, columns=["Course Title", "Course Code", "Class", "Date", "Period"])
    schedules_df.sort_values(by=["Class", "Date"]).to_csv(
        f"{dep}_schedule.csv", index=False)


def get_total_no_seats(halls):
    sum = 0
    for hall in halls:
        sum += hall.capacity

    return sum


def get_total_no_seats_needed(schedules):
    sum = 0
    for schedule in schedules:
        sum += schedule.classe.size
    return sum


def convert_hall_to_dict(halls):
    halls_dict = []
    for hall in halls:
        hall_dict = {
            "id": hall.id,
            "name": hall.name,
            "type": hall.hall_type,
            "capacity": hall.capacity,
            "working_capacity": hall.working_capacity,
            "max_students": hall.max_students,
            "min_courses": hall.min_courses,
            "classes": []
        }
        halls_dict.append(hall_dict)
    return halls_dict


def convert_hall_blocks_to_dict(blocks):
    hall_blocks = []
    for block in blocks:
        halls = []
        for hall in block.halls.all():
            hall_dict = {
                "id": hall.id,
                "name": hall.name,
                "type": hall.hall_type,
                "capacity": hall.capacity,
                "working_capacity": hall.working_capacity,
                "max_students": hall.max_students,
                "min_courses": hall.min_courses,
                "classes": []
                # EG :-
                # CLASSES SHOULD BE {
                #   "CLASS": COMPUTER SCIENCE ND I,
                #   "NO_OF_STUDENTS": 20
                # }
            }
            halls.append(hall_dict)
        block_dict = {
            "id": block.id,
            "name": block.name,
            # "total": block.size,
            "size": block.size,
            "full": False,
            "halls": halls,
            # "classes": []
            # EG : id, department, level, course_code num_of_students_in_block
        }
        hall_blocks.append(block_dict)

    # return sorted(hall_blocks, key=itemgetter("name"))
    return hall_blocks


# def pick_class(schedules, hall):
#     if len(hall["classes"]) == 0:
#         return choice(schedules)
#     else:
#         for schedule in schedules:
#             if not any(cls["id"] == schedule.classe.id or cls["course"] == schedule.course.code for cls in hall["classes"]):
#                 return schedule


def figure_out_exam_for_hall(hall):
    return hall["min_courses"]


def make_schedules(schedules):
    ss = []
    for schedule in schedules:
        ss.append({"id": schedule.id, 'class': schedule.classe.name,
                  "course": schedule.course.code, "size": schedule.classe.size})
    shuffle(ss)
    return ss


def drop_completed_schedules(schedules):
    return [schedule for schedule in schedules if schedule["size"] > 0]


def calc_total_students_in_hall(res):
    sum = 0
    for cls in res["classes"]:
        sum += cls["student_range"]
    return sum


def get_classes_with_length(classes, length):
    res = [cls for cls in classes if cls["size"] >= length]
    return res


def get_unique(schedules):
    ss = []
    res = []
    for schedule in schedules:
        if schedule["course"] not in ss:
            ss.append(schedule["course"])
            res.append(schedule)
    return res


def get_class_for_hall(schedules, length):
    if length == 7:
        res = [schedule for schedule in schedules if schedule["size"] == 71]
        print(len(res))
        return res


# {"id": schedule.id, 'class': schedule.classe.name,
#                   "course": schedule.course.code, "size": schedule.classe.size}


def is_course_in_hall(hall, course_code):
    if len(hall["classes"]) == 0:
        return False
    for cls in hall["classes"]:
        if cls["course"] == course_code:
            return True
    return False


def distribute_classes_to_halls(schedules, halls):
    class_schedules = make_schedules(schedules=schedules)
    results = []
    for hall in halls:
        for schedule in class_schedules:
            if is_course_in_hall(hall, schedule["course"]) or len(hall["classes"]) == hall["min_courses"] or schedule["size"] == 0:
                pass
            else:
                number_of_students = hall["max_students"]
                if number_of_students >= schedule["size"]:
                    number_of_students = schedule["size"]
                if schedule["size"] - number_of_students < 5:
                    number_of_students = schedule["size"]

                res = {"id": schedule["id"], "class": schedule["class"], "course": schedule["course"],
                       "student_range": number_of_students}
                hall["classes"].append(res)
                hall["working_capacity"] -= number_of_students
                schedule["size"] -= number_of_students
    for hall in halls:
        if len(hall["classes"]) == 0:
            pass
        else:
            results.append(hall)
    return results

    # TODO: Find Hall to to fit class and get the block the hall is in and if the course been offered by the class is already in the hall skip that hall
    # for block in blocks:
    #     for hall in block["halls"]:
    #         num_of_exams = figure_out_exam_for_hall(hall=hall)
    #         hall_capacity = hall["working_capacity"]
    #         res = {"block": block["name"], "hall": hall["name"],
    #                "hall_size": hall["capacity"], "working_capacity": hall_capacity, "classes": []}
    #         for schedule in get_unique(class_schedules)[:num_of_exams]:
    #             divisor = hall["max_students"]
    #             if divisor >= schedule["size"]:
    #                 divisor = schedule["size"]
    #             if schedule["size"] - divisor < 5:
    #                 divisor = schedule["size"]

    #             res["classes"].append({"id": schedule["id"], "class": schedule["class"],
    #                                    "course": schedule["course"], "student_range": divisor})
    #             schedule["size"] -= divisor
    #             class_schedules = drop_completed_schedules(class_schedules)
    # sum_of_students = calc_total_students_in_hall(res)
    # seat_remaining = hall_capacity - sum_of_students

    # if seat_remaining < 10 or len(class_schedules) == 0:
    #     pass
    # else:
    #     if seat_remaining < 25:
    #         schedule = class_schedules[0]
    #         divisor = seat_remaining
    #         if seat_remaining >= schedule["size"]:
    #             divisor = schedule["size"]
    #         res["classes"].append({"id": schedule["id"], "class": schedule["class"],
    #                               "course": schedule["course"], "student_range": divisor})
    #         class_schedules[0]["size"] -= divisor
    #         class_schedules = drop_completed_schedules(class_schedules)
    #     elif seat_remaining >= 25 and seat_remaining <= 75:
    #         for schedule in get_unique(class_schedules)[:2]:
    #             schedule = class_schedules[0]
    #             divisor = floor(seat_remaining / 2)
    #             if seat_remaining >= schedule["size"]:
    #                 divisor = schedule["size"]
    #             res["classes"].append({"id": schedule["id"], "class": schedule["class"],
    #                                    "course": schedule["course"], "student_range": divisor})
    #             class_schedules[0]["size"] -= divisor
    #             class_schedules = drop_completed_schedules(
    #                 class_schedules)
    #     elif seat_remaining > 75:
    #         if len(get_unique(class_schedules)[:3]) < 3:
    #             for schedule in class_schedules:
    #                 divisor = floor(
    #                     seat_remaining / len(class_schedules))
    #                 if seat_remaining >= schedule["size"]:
    #                     divisor = schedule["size"]
    #                 res["classes"].append({"id": schedule["id"], "class": schedule["class"],
    #                                        "course": schedule["course"], "student_range": divisor})
    #                 class_schedules[0]["size"] -= divisor
    #                 class_schedules = drop_completed_schedules(
    #                     class_schedules)
    #         else:
    #             for schedule in get_unique(class_schedules)[:3]:
    #                 schedule = class_schedules[0]
    #                 divisor = floor(seat_remaining / 3)
    #                 if seat_remaining >= schedule["size"]:
    #                     divisor = schedule["size"]
    #                 res["classes"].append({"id": schedule["id"], "class": schedule["class"],
    #                                        "course": schedule["course"], "student_range": divisor})
    #                 class_schedules[0]["size"] -= divisor
    #                 class_schedules = drop_completed_schedules(
    #                     class_schedules)

    # if sub > 10 and len(class_schedules) > 0:
    #     res["classes"].append({"id": class_schedules[0]["id"], "class": schedule.classe.name,
    #                            "course": class_schedules[0]["course"], "student_range": class_schedules[0]["size"], "CO": False})
    #     class_schedules[0]["size"] -= class_schedules[0]["size"]
    #     class_schedules = drop_completed_schedules(class_schedules)

    #         if len(res["classes"]) != 0:
    #             results.append(res)
    # return results


def get_courses_for_day(schedules):
    courses = []
    for schedule in schedules:
        course = schedule.course.code
        if course in courses:
            pass
        else:
            courses.append(course)
    return courses


def is_class_fit_for_block(schedule, block):
    block_4 = block["size"] / 4
    print(block_4)
    class_size = schedule.classe.size
    margin = class_size - block_4
    if margin >= 0 and margin <= 20:
        return True
    else:
        return False


def group_class_by_course(schedules):

    grouped_data = {}

    for item in schedules:
        key = item["course_id"]
        if key not in grouped_data:
            grouped_data[key] = {'course': key, 'items': []}
        grouped_data[key]['items'].append(item)

    # Convert the grouped data into a list of dictionaries
    result = list(grouped_data.values())

    # Sort the list by the length of each group in descending order
    result.sort(key=lambda x: len(x['items']), reverse=True)

    return result


def find_halls_for_classes(halls, class_sizes):
    # Initialize a dictionary to store the halls assigned to each class
    class_assignments = {class_name: [] for class_name in class_sizes.keys()}

    # Iterate through the list of halls
    for hall in halls:
        hall_name = hall['name']
        hall_size = hall['size']

        # Iterate through each class and check if the hall can accommodate the class
        for class_name, class_size in class_sizes.items():
            if hall_size >= class_size:
                # Assign the hall to the class
                class_assignments[class_name].append(hall_name)

    return class_assignments
