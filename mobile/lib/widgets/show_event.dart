// ignore_for_file: deprecated_member_use

import 'package:area/model/event_create_model.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:google_fonts/google_fonts.dart';

class ShowEvent extends StatefulWidget {
  const ShowEvent({super.key, required this.event});
  final EventCreationModel event;

  @override
  State<ShowEvent> createState() => _ShowEventState();
}

class _ShowEventState extends State<ShowEvent> {
  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Container(
          constraints: BoxConstraints(minHeight: 102, minWidth: 320),
          decoration: BoxDecoration(
            border: Border.all(
              color: Color(0xFF94A3B8).withOpacity(0.5),
            ),
            borderRadius: BorderRadius.circular(10),
          ),
          padding: EdgeInsets.all(24),
          child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.max,
              children: [
                Text(
                  widget.event.eventName!,
                  style: GoogleFonts.inter(
                      fontSize: 20,
                      fontWeight: FontWeight.w600,
                      color: Colors.white),
                ),
                Text(
                  widget.event.eventDescription!,
                  style: GoogleFonts.inter(fontSize: 14, color: Colors.white),
                ),
                SizedBox(
                  height: 10,
                ),
                Container(
                  width: 42,
                  height: 42,
                  padding: EdgeInsets.all(4),
                  decoration: BoxDecoration(
                    border: Border.all(
                      color: Color(0xFF94A3B8).withOpacity(0.5),
                    ),
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: Center(
                    child: SizedBox(
                      height: 20,
                      width: 20,
                      child: SvgPicture.asset(
                        "assets/icons/settings.svg",
                        color: Colors.white,
                      ),
                    ),
                  ),
                )
              ]),
        )
      ],
    );
  }
}